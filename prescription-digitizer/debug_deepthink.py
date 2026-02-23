import google.generativeai as genai
import os
import time
from dotenv import load_dotenv
from PIL import Image

# Load env
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("❌ No API Key found.")
    exit(1)

genai.configure(api_key=api_key)

# Configuration for Deep Debugging
MODELS_TO_TEST = ["gemini-2.0-flash", "gemini-1.5-pro", "gemini-2.5-pro", "gemini-3-pro-preview"]
IMAGE_PATH = "/home/dhrupad/.gemini/antigravity/brain/fe26d0ba-7305-4275-b917-b8a42cd839d8/media__1771418052228.png"

def test_model(model_name):
    print(f"\n🧪 Testing Model: {model_name}")
    print("-" * 40)
    
    try:
        model = genai.GenerativeModel(model_name)
        img = Image.open(IMAGE_PATH)
        
        # Test 1: Simple Description (Latency Check)
        print("  🔹 Phase 1: Simple Description Check...")
        start_time = time.time()
        try:
            response = model.generate_content(
                ["Describe this medical image in 5 words.", img],
                request_options={"timeout": 60} 
            )
            elapsed = time.time() - start_time
            print(f"     ✅ Success ({elapsed:.2f}s). Output: {response.text.strip()}")
        except Exception as e:
            elapsed = time.time() - start_time
            print(f"     ❌ Failed ({elapsed:.2f}s). Error: {e}")
            return # Skip Phase 2 if Phase 1 fails

        # Test 2: Complex JSON Extraction (DeepThink Check)
        print("  🔹 Phase 2: Complex JSON Extraction...")
        
        # Using the actual complex prompt
        prompt = """
        Extract the prescription details into JSON format.
        Keys: doctor, patient, medicines (name, strength, frequency).
        Be extremely precise.
        """
        
        start_time = time.time()
        try:
            # Enable Streaming to see if it hangs mid-way
            response_stream = model.generate_content(
                [prompt, img], 
                stream=True,
                request_options={"timeout": 120}
            )
            
            print("     ⏳ Streaming chunks...", end="", flush=True)
            chunk_count = 0
            first_chunk_time = None
            
            for chunk in response_stream:
                if chunk_count == 0:
                    first_chunk_time = time.time() - start_time
                chunk_count += 1
                if chunk_count % 10 == 0:
                    print(".", end="", flush=True)
            
            total_time = time.time() - start_time
            ttft = first_chunk_time if first_chunk_time else 0
            
            print(f"\n     ✅ Success.")
            print(f"        - Total Time: {total_time:.2f}s")
            print(f"        - Time to First Token: {ttft:.2f}s")
            print(f"        - Chunks: {chunk_count}")
            
        except Exception as e:
            total_time = time.time() - start_time
            print(f"\n     ❌ Failed Phase 2 ({total_time:.2f}s).")
            print(f"        Error: {e}")
            if hasattr(e, 'finish_reason'):
                print(f"        Finish Reason: {e.finish_reason}")
                
    except Exception as e:
        print(f"  ❌ Model Load Failed: {e}")

if __name__ == "__main__":
    print("🔬 Deep Debugging Protocol Initiated")
    for m in MODELS_TO_TEST:
        test_model(m)
        time.sleep(2) # Cooldown
