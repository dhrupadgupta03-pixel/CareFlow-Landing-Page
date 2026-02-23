import sys
import os
import json

# Add current directory to path
sys.path.append(os.getcwd())

from core.vlm_connector import GeminiConnector

# Path to the prescription image
IMAGE_PATH = "/home/dhrupad/.gemini/antigravity/brain/fe26d0ba-7305-4275-b917-b8a42cd839d8/media__1771418052228.png"

def check_diagnosis():
    print(f"Analyzing {IMAGE_PATH}...")
    vlm = GeminiConnector()
    
    # Run extraction
    data = vlm.extract_structured(IMAGE_PATH)
    
    # Print Full Data
    print(f"\n--- FULL JSON OUTPUT ---")
    print(json.dumps(data, indent=2))
    
    # Check specific fields
    diag = data.get("diagnosis")
    cc = data.get("chief_complaint")
    
    print(f"\nDiagnosis: '{diag}'")
    print(f"Chief Complaint: '{cc}'")

if __name__ == "__main__":
    check_diagnosis()
