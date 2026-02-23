import google.generativeai as genai
import os
import time
import json
from dotenv import load_dotenv
from PIL import Image

# Load env
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

MODEL_NAME = "gemini-3-pro-preview"
IMAGE_PATH = "/home/dhrupad/.gemini/antigravity/brain/fe26d0ba-7305-4275-b917-b8a42cd839d8/media__1771418052228.png"

# --- PROMPTS REPOSITORY ---

PROMPTS = {
    "1_Simple_Transcribe": "Transcribe all the handwritten text in this image exactly as it appears. Do not structure it.",
    
    "2_List_Format": "List the following details from the prescription:\n1. Doctor Name\n2. Patient Name\n3. Medicines (Name, Strength, Frequency)",
    
    "3_Markdown_Table": "Create a Markdown table with columns: Medicine Name, Strength, Frequency, Duration.",
    
    "4_Flat_JSON": "Extract keys: 'doctor', 'patient', 'medicines_text' (as a single string). Return JSON.",
    
    "5_CoT_Reasoning": "Think step-by-step. First, identify the handwritten sections. Second, read the doctor's handwriting letter by letter. Third, list the medicines. Finally, output the summary.",
    
    "6_Roleplay_Pharmacist": "You are an expert Indian Pharmacist. Read this prescription and interpret the medicines. Explain your reasoning for each drug name.",
    
    "7_XML_Structure": "Extract the prescription into XML format with tags <doctor>, <patient>, <medicine_list>.",
    
    "8_Relaxed_Schema": """Extract into this JSON structure (return null if not found):
    {
      "doctor": "name",
      "medicines": [{"name": "drug", "dosage": "info"}]
    }
    Do not be too strict. Just do your best.""",
    
    "9_Reasoning_First_JSON_Later": "First, write out your thought process about what the text says. Then, provide a JSON extraction.",
    
    "10_Original_Strict_Schema": """EXTRACT EXACT JSON:
    {
      "header": {"doctor_name": "string", "hospital_name": "string"},
      "patient": {"name": "string", "age": "string"},
      "medicines": [{"name": "string", "strength": "string", "frequency": "string"}]
    }"""
}

def run_experiment():
    print(f"🧪 Starting Gemini 3.0 Prompt Experiment on {IMAGE_PATH}")
    print(f"   Model: {MODEL_NAME}")
    print("="*60)
    
    try:
        model = genai.GenerativeModel(MODEL_NAME)
        img = Image.open(IMAGE_PATH)
        
        results = []
        
        for name, prompt_text in PROMPTS.items():
            print(f"\n🔹 Testing Prompt: {name}")
            start_time = time.time()
            try:
                # 300s Timeout (5 Minutes)
                response = model.generate_content(
                    [prompt_text, img],
                    request_options={"timeout": 300}
                )
                elapsed = time.time() - start_time
                
                # Check if output is empty/blocked
                if not response.text:
                    status = "BLOCKED/EMPTY"
                    preview = "N/A"
                else:
                    status = "SUCCESS"
                    preview = response.text[:100].replace("\n", " ") + "..."
                
                print(f"     ✅ {status} ({elapsed:.2f}s)")
                print(f"     📝 Output: {preview}")
                
            except Exception as e:
                elapsed = time.time() - start_time
                status = f"FAILED ({str(e)})"
                print(f"     ❌ {status} ({elapsed:.2f}s)")
            
            results.append({
                "prompt": name,
                "status": status,
                "latency": f"{elapsed:.2f}s"
            })
            
            # Cooldown
            time.sleep(2)
            
        print("\n" + "="*60)
        print("📊 EXPERIMENT SUMMARY")
        print(f"{'Prompt Name':<30} | {'Status':<30} | {'Latency':<10}")
        print("-" * 75)
        for r in results:
            print(f"{r['prompt']:<30} | {r['status']:<30} | {r['latency']:<10}")

    except Exception as e:
        print(f"CRITICAL ERROR: {e}")

if __name__ == "__main__":
    run_experiment()
