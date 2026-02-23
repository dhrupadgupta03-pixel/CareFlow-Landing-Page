import csv
import json
import re
import os

CSV_PATH = "/tmp/Indian-Medicine-Dataset/DATA/updated_indian_medicine_data.csv"
OUTPUT_JSON = "data/medicines_india_full.json"

def clean_brand_name(full_name):
    """
    Extracts the brand name from a full medicine string.
    Heuristic: 
    1. Split by known forms (Tablet, Capsule, Syrup, Injection, Gel, Cream, Ointment, etc.)
    2. Remove numbers (strengths) from the end of the brand part.
    """
    # Remove common forms
    forms = ["Tablet", "Capsule", "Syrup", "Injection", "Gel", "Cream", "Ointment", "Drops", "Suspension", "Solution", "Respules", "Inhaler", "Expectorant", "Lozenges", "Spray", "Powder", "Sachet", "Granules", "Oil", "Paste", "Soap", "Shampoo", "Lotion", "Emulgel", "Paint", "Liquid", "Infusion", "Vaccine", "Patch", "Strip", "Kit", "Combikit", "Pen", "Cartridge", "Prefilled Syringe", "Rotacap", "Transcaps", "Octreotide", "Enema", "Suppository", "Pessary", "Rectal", "Vaginal", "Nasal", "Eye", "Ear", "Oral", "Topical", "Dental", "Inhalation", "Intravenous", "Intramuscular", "Subcutaneous", "Intradermal", "Transdermal"]
    
    # Sort forms by length desc to match longest first
    forms.sort(key=len, reverse=True)
    
    # Case insensitive regex for forms
    form_pattern = re.compile(r'\b(' + '|'.join(map(re.escape, forms)) + r')\b', re.IGNORECASE)
    
    # Remove the form and everything after it? 
    # E.g. "Augmentin 625 Duo Tablet" -> "Augmentin 625 Duo"
    # E.g. "Ascoril LS Syrup" -> "Ascoril LS"
    
    # Split by form
    parts = form_pattern.split(full_name)
    brand_part = parts[0].strip()
    
    # Now remove strength if present at the end of brand_part
    # E.g. "Augmentin 625" -> "Augmentin"
    # E.g. "Dolo 650" -> "Dolo"
    # Regex for strength at end: \b\d+(?:mg|g|ml|mcg|iu|%)\b or just \d+
    
    # We want to capture the STRENGTH as well to add to the DB
    strength_pattern = re.search(r'(\d+(?:\.\d+)?(?:\s*(?:mg|g|ml|mcg|iu|%))?)', full_name, re.IGNORECASE)
    extracted_strength = strength_pattern.group(1) if strength_pattern else None
    
    # Clean matches from brand_part
    # Remove strengths like "500", "650", "500mg" from the brand name
    brand_clean = re.sub(r'\b\d+(?:\.\d+)?(?:\s*(?:mg|g|ml|mcg|iu|%))?\b', '', brand_part).strip()
    # Remove standalone numbers like "625"
    brand_clean = re.sub(r'\b\d+\b', '', brand_clean).strip()
    # Remove "Duo", "Plus", "Forte"?? No, keep them as they are part of brand variant.
    # "Augmentin Duo" is distinct from "Augmentin".
    
    # Remove trailing hyphens or non-alphanumeric
    brand_clean = re.sub(r'[^a-zA-Z0-9\s]+$', '', brand_clean).strip()
    
    return brand_clean, extracted_strength, parts[0] # Return raw brand part too for debugging

def ingest():
    print("Reading CSV...")
    medicines = set()
    dosage_db = {}
    
    skipped = 0
    processed = 0
    
    with open(CSV_PATH, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            processed += 1
            if processed % 10000 == 0:
                print(f"Processed {processed} rows...")
                
            full_name = row.get('name', '').strip()
            if not full_name:
                continue
                
            # Add full name to flat list for fuzzy matching
            # Clean it a bit (remove "strip of 10 tablets" etc if present, though based on CSV preview it's just Name)
            medicines.add(full_name)
            
            # Extract Brand and Strength for Dosage DB
            brand, strength, pre_form = clean_brand_name(full_name)
            
            if not brand:
                skipped += 1
                continue
                
            # Normalize Brand Key
            brand_key = brand
            
            if brand_key not in dosage_db:
                dosage_db[brand_key] = {
                    "valid_strengths": set(),
                    "route": "Unknown" # extraction from type/pack_size_label needed
                }
            
            # Extract Route
            pack_label = row.get('pack_size_label', '').lower()
            route = "Unknown"
            if "tablet" in pack_label: route = "Tab"
            elif "capsule" in pack_label: route = "Cap"
            elif "syrup" in pack_label or "liquid" in pack_label or "solution" in pack_label: route = "Syr"
            elif "injection" in pack_label or "vial" in pack_label: route = "Inj"
            elif "cream" in pack_label or "gel" in pack_label or "ointment" in pack_label: route = "Topical"
            
            dosage_db[brand_key]["route"] = route
            
            if strength:
                # Normalize strength (remove spaces, lowercase)
                s_norm = strength.replace(" ", "").lower()
                # If just a number, assume mg? No, dangerous.
                # If "500", append "mg" if not present?
                # Many entries in CSV are just "500".
                if s_norm.isdigit():
                    s_norm += "mg" 
                
                dosage_db[brand_key]["valid_strengths"].add(s_norm)

    # Convert sets to lists
    final_dosage_db = {}
    for k, v in dosage_db.items():
        if len(v["valid_strengths"]) > 0:
            final_dosage_db[k] = {
                "valid_strengths": sorted(list(v["valid_strengths"])),
                "route": v["route"]
            }
        else:
             # Keep brands even without strengths? Yes, for name matching.
            final_dosage_db[k] = {
                "valid_strengths": [],
                "route": v["route"]
            }

    # Merge with existing manual DB?
    # Or just replace? The manual DB has accurate strengths for common drugs.
    # PROPOSAL: Load manual DB, update it with ingested data (keeping manual as priority if conflict?)
    # Actually, let's keep the manual DB entries as "Gold Standard" and only add new ones.
    
    print(f"Ingested {len(medicines)} unique names.")
    print(f"Created {len(final_dosage_db)} unique brands.")
    
    # Load manual data
    try:
        with open("data/medicines_india.json", "r") as f:
            manual_data = json.load(f)
            manual_db = manual_data.get("dosage_db", {})
            
            # Merge: Use manual_db as baseline, add missing from final_dosage_db
            # This ensures "Progut" and others we manually corrected stay correct
            for k, v in final_dosage_db.items():
                if k not in manual_db:
                    manual_db[k] = v
                else:
                    # Merge strengths?
                    # Be careful not to pollute manual clean data with noise
                    pass 
            
            final_output = {
                "medicines": sorted(list(medicines)),
                "dosage_db": manual_db
            }
            
            with open(OUTPUT_JSON, "w") as out:
                json.dump(final_output, out, indent=2)
                print(f"Written merged database to {OUTPUT_JSON}")
                
    except Exception as e:
        print(f"Error merging: {e}")
        # Fallback dump
        with open(OUTPUT_JSON, "w") as out:
            json.dump({
                "medicines": sorted(list(medicines)),
                "dosage_db": final_dosage_db
            }, out, indent=2)

if __name__ == "__main__":
    ingest()
