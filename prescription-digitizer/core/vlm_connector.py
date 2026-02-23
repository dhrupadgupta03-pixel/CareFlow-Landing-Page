import os
import json
import google.generativeai as genai
from PIL import Image
from dotenv import load_dotenv
from debug_monitor.instrumentation import trace
from .regex_cleaner import clean_prescription_json

# Load environment variables (GEMINI_API_KEY)
load_dotenv()

# Strict JSON Schema for prescription extraction
EXTRACTION_SCHEMA = """{
  "header": {
    "hospital_name": "string or null",
    "doctor_name": "string or null", 
    "doctor_degrees": "string or null",
    "address": "string or null",
    "contact": "string or null"
  },
  "patient": {
    "name": "string or null",
    "age": "string or null",
    "sex": "string or null",
    "date": "string or null"
  },
  "diagnosis": "string or null",
  "chief_complaint": "string or null",
  "investigations": ["string"],
  "medicines": [
    {
      "name": "string (correct the drug name to its proper spelling)",
      "strength": "string or null (e.g. 50mg, 500mg)",
      "frequency": "string or null (e.g. 2+0+2, 1-0-1, BD, TDS)",
      "duration": "string or null (e.g. 7 days, 2 weeks)",
      "route": "string or null (e.g. Tab, Cap, Syp, Inj)"
    }
  ],
  "advice": ["string"],
  "follow_up": "string or null",
  "visits": [
    {
      "date": "string",
      "diagnosis": "string or null",
      "medicines": [{"name":"string","strength":"string or null","frequency":"string or null","duration":"string or null","route":"string or null"}],
      "investigations": ["string"],
      "advice": ["string"]
    }
  ]
}"""

EXTRACTION_PROMPT = f"""You are a medical prescription digitizer with expert knowledge of Indian pharmaceuticals.

TASK: Extract ALL information from this handwritten prescription image into the exact JSON structure below.

RULES:
1. CORRECT drug names to their proper pharmaceutical spelling (e.g., "Diclofenne" → "Diclofenac", "Omeprony" → "Omeprazole", "Ultrafen" → "Ultrafen Plus").
2. If the prescription contains MULTIPLE visits (different dates), separate them into the "visits" array.
3. The first/main visit goes in the top-level fields. Subsequent visits go in the "visits" array.
4. If a field is not present or unreadable, set it to null.
5. For frequency, use the doctor's notation (e.g., "2+0+2", "0+1+0", "BD", "TDS").
6. Extract printed header text (hospital name, doctor name, degrees, address) separately from handwritten content.
7. Return ONLY valid JSON. No markdown, no explanation, no code fences.

JSON SCHEMA:
{EXTRACTION_SCHEMA}"""



class GeminiConnector:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables.")
            
        genai.configure(api_key=self.api_key)
        # Using Gemini 3.0 Pro (Split-Brain Architecture for Reliability)
        self.model = genai.GenerativeModel("gemini-3-pro-preview")
        self.generation_config = genai.types.GenerationConfig(
            candidate_count=1,
            max_output_tokens=8192,
            temperature=0.2, 
        )

    @trace
    def digitize_image(self, image_path, mode="EXTENDED"):
        """
        Stage 1: Pure Perception (Raw Transcription).
        """
        try:
            img = Image.open(image_path)
            
            # User's Hypothesis: JSON Prompt for Stage 1 (Optimized for Completeness)
            prompt = """
            Analyze this prescription image. 
            Extract the data into this simple JSON format.
            CRITICAL: List EVERY single medicine line found. Do not summarize.
            
            {
              "doctor_name": "string",
              "patient_name": "string",
              "diagnosis": "string",
              "medicines_list": [
                "1. Full text of medicine line 1",
                "2. Full text of medicine line 2",
                "..."
              ],
              "investigations": ["string"],
              "advice": ["string"],
              "next_visit": "string"
            }
            Return ONLY the valid JSON.
            """
                
            # 5 Minute Timeout for Deep Reasoning
            response = self.model.generate_content(
                [prompt, img], 
                generation_config=self.generation_config,
                request_options={"timeout": 360}
            )
            print(f"DEBUG: Stage 1 Output: {response.text[:200]}...")
            return response.text
            return response.text
            
        except Exception as e:
            raise

    @trace
    def extract_structured(self, image_path):
        """
        Stage 2: Structure Reasoning (Text -> JSON).
        """
        # Step 1: Get Raw Text (JSON Format)
        raw_json_text = self.digitize_image(image_path, mode="EXTENDED")
        
        # Parse Stage 1 JSON to extract Clean List
        try:
            cleaned_json = raw_json_text.strip()
            if cleaned_json.startswith("```"):
                cleaned_json = cleaned_json.split("\n", 1)[1]
                if cleaned_json.endswith("```"):
                    cleaned_json = cleaned_json[:-3]
            
            stage1_data = json.loads(cleaned_json)
            
            # Extract the meaningful text for Stage 2
            # We want: Doctor, Patient, Diagnosis, and the LIST of medicines
            context_text = f"""
            Doctor: {stage1_data.get('doctor_name', 'Unknown')}
            Patient: {stage1_data.get('patient_name', 'Unknown')}
            Diagnosis: {stage1_data.get('diagnosis', 'None')}
            
            MEDICINES LIST:
            """
            
            meds = stage1_data.get('medicines_list', [])
            if isinstance(meds, list):
                for m in meds:
                    context_text += f"- {m}\n"
            else:
                context_text += f"{meds}\n"
                
            # Add other fields
            context_text += f"\nInvestigations: {stage1_data.get('investigations', [])}"
            context_text += f"\nAdvice: {stage1_data.get('advice', [])}"
            
            print(f"DEBUG: Stage 2 Input Text:\n{context_text}")
            
        except Exception as e:
            print(f"WARNING: Stage 1 JSON Parse Failed: {e}. Using raw text.")
            context_text = raw_json_text

        # Step 2: Convert to JSON
        reasoning_prompt = f"""
        You are an expert medical data clerk.
        Convert the following parsed prescription data into structured JSON.
        
        DATA:
        {context_text}
        
        RULES:
        1. Extract Doctor, Patient, Medicines, Diagnosis.
        2. Use the Schema strictly.
        3. Correct drug names based on context.
        
        JSON SCHEMA:
        {EXTRACTION_SCHEMA}
        """
        
        try:
            # 5 Minute Timeout for Reasoning
            response = self.model.generate_content(
                reasoning_prompt,
                request_options={"timeout": 360}
            )
            cleaned = response.text.strip()
            if cleaned.startswith("```"):
                cleaned = cleaned.split("\n", 1)[1]
                if cleaned.endswith("```"):
                    cleaned = cleaned[:-3]
                cleaned = cleaned.strip()
                
            data = json.loads(cleaned)
            # We still keep Regex Layer as a fallback safety
            data = clean_prescription_json(data)
            return data
            
        except Exception as e:
            # Fallback
            return {"raw_text": raw_json_text, "parse_error": True, "error": str(e)}
