import os
import sys
from core.vlm_connector import GeminiConnector
from core.rag_engine import RAGEngine

# Setup paths
INPUT_IMAGE = "data/test_samples/sample_segment.png"
OUTPUT_FILE = "verification_segment_results.txt"

with open(OUTPUT_FILE, "w") as f:
    f.write(f"🚀 Starting Verification on Segment {INPUT_IMAGE}...\n")

    try:
        # Initialize components
        connector = GeminiConnector()
        rag = RAGEngine()

        # Step 1: OCR
        f.write("Step 1: OCR...\n")
        raw_text = connector.digitize_image(INPUT_IMAGE, mode="QUICK")
        clean_raw = raw_text.strip()
        f.write(f"  - Raw OCR Output: '{clean_raw}'\n")

        # Step 2: RAG
        f.write("Step 2: RAG Reconciliation...\n")
        corrected_name, conf = rag.reconcile_medicine(clean_raw)
        
        result_str = f"Final Output: '{corrected_name}' (Confidence: {conf}%)"
        f.write(f"  - {result_str}\n")
        
        f.write("\n✅ Verification Complete.\n")

    except Exception as e:
        f.write(f"\n❌ Pipeline Failed: {e}\n")
