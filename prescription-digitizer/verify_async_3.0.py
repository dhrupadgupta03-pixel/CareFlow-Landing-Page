from core.vlm_connector import GeminiConnector
import json
import time

connector = GeminiConnector()
IMAGE_PATH = "/home/dhrupad/.gemini/antigravity/brain/fe26d0ba-7305-4275-b917-b8a42cd839d8/media__1771418052228.png"

print("🧪 Starting End-to-End Verification of Gemini 3.0 Split-Brain Pipeline...")
start_time = time.time()

try:
    data = connector.extract_structured(IMAGE_PATH)
    elapsed = time.time() - start_time
    
    print(f"✅ Success! ({elapsed:.2f}s)")
    print(json.dumps(data, indent=2))
    
except Exception as e:
    elapsed = time.time() - start_time
    print(f"❌ Failed! ({elapsed:.2f}s)")
    print(e)
