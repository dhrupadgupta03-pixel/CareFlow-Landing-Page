import re

class DataValidator:
    def is_valid_format(self, drug_name):
        """
        Checks if the drug name follows reasonable patterns.
        Rejects obviously bad OCR or scraping errors.
        """
        if len(drug_name) < 3:
            return False
            
        # Reject keys with special chars often found in bad scraping
        if re.search(r"[{}@#$%^&*=<>?/;]", drug_name):
            return False
            
        # Reject our known typo pattern (e.g., 40e0mg)
        if re.search(r"\d+e\d+mg", drug_name, re.IGNORECASE):
            return False
            
        return True

    def check_count_amenaly(self, new_count, old_count):
        """
        Alerts if the total number of drugs changed by more than 5%.
        This prevents wiping the DB if a scraper fails returning 0 results.
        """
        if old_count == 0: 
            return True # Initial load
            
        diff = abs(new_count - old_count)
        percent_change = (diff / old_count) * 100
        
        if percent_change > 5:
            print(f"WARNING: DB count changed by {percent_change:.2f}% (Old: {old_count}, New: {new_count})")
            return False
            
        return True
