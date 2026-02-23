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

IMAGE_PATH = "/home/dhrupad/.gemini/antigravity/brain/fe26d0ba-7305-4275-b917-b8a42cd839d8/media__1771418052228.png"
MODEL_NAME = "gemini-3-pro-preview"

def test_split_brain():
    print(f"\n🧪 Testing Split-Brain Architecture on {MODEL_NAME}")
    print("-" * 50)
    
    try:
        model = genai.GenerativeModel(MODEL_NAME)
        img = Image.open(IMAGE_PATH)
        
        # STAGE 1: PERCEPTION (Raw Transcription)
        print("  🔹 Stage 1: Pure Perception (Transcribe Only)...")
        perception_prompt = "Transcribe all the handwritten text in this image exactly as it appears. Do not structure it. Just list the lines of text."
        
        start_time = time.time()
        try:
            # High timeout for image processing
            response_1 = model.generate_content(
                [perception_prompt, img],
                request_options={"timeout": 180} 
            )
            raw_text = response_1.text
            elapsed_1 = time.time() - start_time
            print(f"     ✅ Perception Complete ({elapsed_1:.2f}s)")
            print(f"     📝 Extracted Text Preview: {raw_text[:100]}...")
            
        except Exception as e:
            print(f"     ❌ Stage 1 Failed: {e}")
            return

        # STAGE 2: REASONING (Text -> JSON)
        print("\n  🔹 Stage 2: Pure Reasoning (Text to JSON)...")
        reasoning_prompt = f"""
        You are an expert medical data clerk.
        Convert the following raw transcription into structured JSON.
        Keys: doctor, patient, medicines (name, strength, frequency).
        
        RAW TEXT:
        {raw_text}
        """
        
        start_time_2 = time.time()
        try:
            # Text-only generation should be faster
            response_2 = model.generate_content(
                reasoning_prompt,
                request_options={"timeout": 120}
            )
            elapsed_2 = time.time() - start_time_2
            print(f"     ✅ Reasoning Complete ({elapsed_2:.2f}s)")
            
            total_time = elapsed_1 + elapsed_2
            print(f"\n  🎉 SPLIT-BRAIN SUCCESS!")
            print(f"     Total Latency: {total_time:.2f}s (vs >60s Timeout)")
            
        except Exception as e:
            print(f"     ❌ Stage 2 Failed: {e}")

    except Exception as e:
        print(f"  ❌ System Error: {e}")

if __name__ == "__main__":
    test_split_brain()
