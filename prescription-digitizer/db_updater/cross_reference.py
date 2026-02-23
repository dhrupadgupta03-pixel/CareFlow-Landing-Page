from rapidfuzz import fuzz, process

class CrossReferencer:
    def __init__(self, threshold=85):
        self.threshold = threshold

    def validate_cross_source(self, drug_entry, all_data_by_source):
        """
        Validates if a drug exists in at least one other source with >85 similarity.
        """
        matches_found = 0
        drug_name = drug_entry['name']
        source = drug_entry['source']
        
        # Check against every other source
        for other_source, other_drugs in all_data_by_source.items():
            if other_source == source:
                continue
                
            # Fuzzy match against the list of names in the other source
            other_names = [d['name'] for d in other_drugs]
            match = process.extractOne(drug_name, other_names, scorer=fuzz.token_sort_ratio)
            
            if match and match[1] >= self.threshold:
                matches_found += 1
                
        # Return True if confirmed by at least 1 other independent source
        # (Total sources = 3, so matching 1 other means 2/3 majority)
        return matches_found >= 1
