import os
import time
from core.vlm_connector import GeminiConnector
from core.bifurcation import ImageBifurcator
from core.rag_engine import RAGEngine
from core.preprocessing import ImagePreprocessor
from debug_monitor.logger import logger

# Setup paths
INPUT_IMAGE = "data/test_samples/sample_01.png"
if not os.path.exists(INPUT_IMAGE):
    print(f"Error: {INPUT_IMAGE} not found.")
    exit(1)

print(f"🚀 Starting Verification Pipeline on {INPUT_IMAGE}...")

try:
    # Initialize components
    connector = GeminiConnector()
    preprocessor = ImagePreprocessor()
    bifurcator = ImageBifurcator()
    rag = RAGEngine()

    # Step 0: Preprocessing
    print("Step 0: Preprocessing...")
    processed_path = INPUT_IMAGE.replace(".png", "_proc.png")
    preprocessor.preprocess(INPUT_IMAGE, output_path=processed_path)
    print(f"  - Saved processed image to {processed_path}")

    # Step 1: Segmentation
    print("Step 1: Bifurcation (Segmentation)...")
    segment_paths = bifurcator.segment_lines(processed_path)
    print(f"  - Created {len(segment_paths)} segments.")

    # Step 2: OCR & RAG
    print("Step 2: OCR & RAG on Segments...")
    results = []
    
    # Process only first 5 segments for speed in verification if there are many
    # But for accuracy check we should do all. complex image might have 10-20.
    for i, seg_path in enumerate(segment_paths):
        print(f"  - Processing segment {i+1}/{len(segment_paths)}: {os.path.basename(seg_path)}")
        
        # Raw OCR
        raw_text = connector.digitize_image(seg_path, mode="QUICK")
        clean_raw = raw_text.strip()
        
        # RAG
        corrected_name, conf = rag.reconcile_medicine(clean_raw)
        
        result_str = f"Seg {i+1}: '{clean_raw}' -> RAG: '{corrected_name}' ({conf}%)"
        results.append(result_str)
        print(f"    - Result: {result_str}")

    print("\n\n=== FINAL STRUCTURED OUTPUT ===")
    print("\n".join(results))

    print("\n\n=== SCIENTIFIC DEBUG LOG (LAST 20 LINES) ===")
    if os.path.exists("logs/scientific_debug.log"):
        with open("logs/scientific_debug.log", "r") as f:
            print("".join(f.readlines()[-20:]))

except Exception as e:
    print(f"\n❌ Pipeline Failed: {e}")
