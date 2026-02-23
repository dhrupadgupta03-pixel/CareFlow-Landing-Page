import json
import os
from rapidfuzz import process, fuzz
from debug_monitor.instrumentation import trace

class RAGEngine:
    def __init__(self, db_path="data/medicines_india.json"):
        self.db_path = db_path
        self.medicine_list = []
        self.dosage_db = {}
        self._load_db()

    def _load_db(self):
        if not os.path.exists(self.db_path):
            return
        
        try:
            with open(self.db_path, 'r') as f:
                data = json.load(f)
                self.medicine_list = data.get("medicines", [])
                self.dosage_db = data.get("dosage_db", {})
        except Exception:
            pass

    @trace
    def reconcile_medicine(self, extracted_name, threshold=80):
        """
        Match an extracted medicine name against the database.
        """
        if not self.medicine_list:
            return extracted_name, 0
            
        match = process.extractOne(
            extracted_name, 
            self.medicine_list, 
            scorer=fuzz.token_sort_ratio
        )
        
        if match and match[1] >= threshold:
            return match[0], match[1]
        
        return extracted_name, match[1] if match else 0

    @trace
    def validate_strength(self, medicine_name, extracted_strength):
        """
        Validate an extracted strength against known valid strengths.
        Returns (corrected_strength, is_valid, suggestion).
        """
        if not extracted_strength or not self.dosage_db:
            return extracted_strength, True, None

        # Find the closest medicine name in dosage_db
        db_names = list(self.dosage_db.keys())
        match = process.extractOne(
            medicine_name, 
            db_names, 
            scorer=fuzz.token_sort_ratio
        )
        
        if not match or match[1] < 70:
            return extracted_strength, True, None  # Unknown drug, can't validate
        
        matched_name = match[0]
        valid_strengths = self.dosage_db[matched_name].get("valid_strengths", [])
        
        if not valid_strengths:
            return extracted_strength, True, None  # No strength data available
        
        # Normalize extracted strength
        norm_extracted = extracted_strength.lower().replace(" ", "")
        
        # Check exact match
        for vs in valid_strengths:
            if vs.lower().replace(" ", "") == norm_extracted:
                return extracted_strength, True, None
        
        # No exact match — find the closest valid strength
        # Try fuzzy match on strengths
        strength_match = process.extractOne(
            norm_extracted,
            [s.lower().replace(" ", "") for s in valid_strengths],
            scorer=fuzz.ratio
        )
        
        if strength_match and strength_match[1] > 50:
            idx = [s.lower().replace(" ", "") for s in valid_strengths].index(strength_match[0])
            suggested = valid_strengths[idx]
            return suggested, False, f"'{extracted_strength}' is not a valid strength for {matched_name}. Valid: {', '.join(valid_strengths)}. Corrected to '{suggested}'."
        
        # No close match — flag it
        return extracted_strength, False, f"'{extracted_strength}' is not a known strength for {matched_name}. Valid strengths: {', '.join(valid_strengths)}."

    @trace
    def validate_prescription(self, structured_data):
        """
        Post-validation: Cross-check all extracted medicines against the dosage DB.
        Returns the data with corrections and a list of warnings.
        """
        warnings = []
        
        def validate_med_list(medicines, visit_label=""):
            for i, med in enumerate(medicines):
                name = med.get("name", "")
                strength = med.get("strength")
                
                # Step 1: Validate medicine name against dosage_db keys (name-only)
                db_names = list(self.dosage_db.keys()) if self.dosage_db else []
                if db_names:
                    name_match = process.extractOne(
                        name, db_names, scorer=fuzz.token_sort_ratio
                    )
                    if name_match and name_match[1] >= 80 and name_match[0] != name:
                        med["name"] = name_match[0]
                        med["_name_corrected"] = True
                        warnings.append(f"{visit_label}Medicine '{name}' → corrected to '{name_match[0]}' ({name_match[1]:.0f}% match)")
                
                # Step 2: Validate strength
                if strength:
                    corrected_strength, is_valid, msg = self.validate_strength(
                        med["name"], strength
                    )
                    if not is_valid:
                        med["strength"] = corrected_strength
                        med["_strength_corrected"] = True
                        warnings.append(f"{visit_label}{msg}")
        
        # Validate main medicines
        medicines = structured_data.get("medicines", [])
        validate_med_list(medicines)
        
        # Validate follow-up visit medicines
        visits = structured_data.get("visits", [])
        for v_idx, visit in enumerate(visits):
            v_meds = visit.get("medicines", [])
            validate_med_list(v_meds, f"Visit {v_idx + 2}: ")
        
        structured_data["_validation_warnings"] = warnings
        return structured_data
