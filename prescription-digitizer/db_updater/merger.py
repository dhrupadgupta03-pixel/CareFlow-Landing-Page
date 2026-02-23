import json
import os
import shutil
from datetime import datetime

class DBMerger:
    def __init__(self, db_path="data/medicines_india.json"):
        self.db_path = db_path
        
    def load_current_db(self):
        if not os.path.exists(self.db_path):
            return {"medicines": []}
        try:
            with open(self.db_path, 'r') as f:
                return json.load(f)
        except Exception:
            return {"medicines": []}

    def merge_and_save(self, new_medicines):
        """
        Merges new list with existing DB.
        Creates a backup before saving.
        """
        current_data = self.load_current_db()
        old_medicines = set(current_data.get("medicines", []))
        new_set = set(new_medicines)
        
        # Merge: Union of old and new (we don't delete old drugs for now to be safe)
        merged_set = old_medicines.union(new_set)
        sorted_list = sorted(list(merged_set))
        
        # Backup
        if os.path.exists(self.db_path):
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            backup_path = f"{self.db_path}.{timestamp}.bak"
            shutil.copy(self.db_path, backup_path)
            print(f"Backup created at {backup_path}")
            
        # Save
        with open(self.db_path, 'w') as f:
            json.dump({"medicines": sorted_list}, f, indent=2)
            
        print(f"DB updated. Total entries: {len(sorted_list)}")
