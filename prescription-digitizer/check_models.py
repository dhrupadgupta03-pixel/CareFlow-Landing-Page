import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("No API Key found")
    exit()

genai.configure(api_key=api_key)

print("Listing available Gemini models:")
for m in genai.list_models():
    if "gemini" in m.name:
        print(f"- {m.name} ({m.display_name})")
