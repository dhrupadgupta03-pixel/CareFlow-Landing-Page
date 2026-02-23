import json
import re
import os

# Load frequencies/abbreviations
DATA_PATH = os.path.join(os.path.dirname(__file__), "../data/frequencies_india.json")

try:
    with open(DATA_PATH, "r") as f:
        KNOWLEDGE_BASE = json.load(f)
        REPLACEMENTS = KNOWLEDGE_BASE.get("replacements", {})
except Exception as e:
    print(f"Warning: Could not load frequencies_india.json: {e}")
    REPLACEMENTS = {}

def clean_text_field(text):
    """
    Applies regex replacements to a single string.
    """
    if not text or not isinstance(text, str):
        return text
    
    # Case insensitive replacement
    # Sort replacements by length desc to avoid partial matches
    sorted_keys = sorted(REPLACEMENTS.keys(), key=len, reverse=True)
    
    cleaned = text
    for key in sorted_keys:
        val = REPLACEMENTS[key]
        # Regex to match whole word or specific patterns
        # For "elo", we want strict match or bounded match?
        # "elo Pain" -> "c/o Pain". "Below" -> "Below" (don't change).
        # So \b key \b might be safer.
        # But "c/o" has special chars.
        
        # Use word boundaries for safety (prevent "Below" -> "Bc/ow")
        # Handle cases where key might not start/end with word char
        # But generally, abbreviations are words.
        regex_pattern = r'(?i)\b' + re.escape(key) + r'\b'
        
        cleaned = re.sub(regex_pattern, val, cleaned)
        
    return cleaned

def clean_prescription_json(data):
    """
    Recursively cleans all string fields in the JSON.
    """
    if isinstance(data, dict):
        return {k: clean_prescription_json(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [clean_prescription_json(i) for i in data]
    elif isinstance(data, str):
        return clean_text_field(data)
    else:
        return data
