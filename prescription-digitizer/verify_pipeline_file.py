import os
import sys
from core.vlm_connector import GeminiConnector
from core.bifurcation import ImageBifurcator
from core.rag_engine import RAGEngine
from core.preprocessing import ImagePreprocessor

# Setup paths
INPUT_IMAGE = "data/test_samples/sample_01.png"
OUTPUT_FILE = "verification_results.txt"

with open(OUTPUT_FILE, "w") as f:
    f.write(f"🚀 Starting Verification Pipeline on {INPUT_IMAGE}...\n")

    try:
        # Initialize components
        connector = GeminiConnector()
        preprocessor = ImagePreprocessor()
        bifurcator = ImageBifurcator()
        rag = RAGEngine()

        # Step 0: Preprocessing
        f.write("Step 0: Preprocessing...\n")
        processed_path = INPUT_IMAGE.replace(".png", "_proc.png")
        preprocessor.preprocess(INPUT_IMAGE, output_path=processed_path)
        f.write(f"  - Saved processed image to {processed_path}\n")

        # Step 1: Segmentation
        f.write("Step 1: Bifurcation (Segmentation)...\n")
        segment_paths = bifurcator.segment_lines(processed_path)
        f.write(f"  - Created {len(segment_paths)} segments.\n")

        # Step 2: OCR & RAG
        f.write("Step 2: OCR & RAG on Segments...\n")
        
        # Process first 5 segments
        for i, seg_path in enumerate(segment_paths[:5]):
            f.write(f"  - Processing segment {i+1}...\n")
            
            # Raw OCR
            raw_text = connector.digitize_image(seg_path, mode="QUICK")
            clean_raw = raw_text.strip()
            
            # RAG
            corrected_name, conf = rag.reconcile_medicine(clean_raw)
            
            result_str = f"Seg {i+1}: '{clean_raw}' -> RAG: '{corrected_name}' ({conf}%)"
            f.write(f"    - Result: {result_str}\n")
            f.flush()

        f.write("\n✅ Verification Complete.\n")

    except Exception as e:
        f.write(f"\n❌ Pipeline Failed: {e}\n")
