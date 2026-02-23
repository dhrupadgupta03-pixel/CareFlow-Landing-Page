import json
import sys
import time
sys.path.insert(0, '.')

from core.rag_engine import RAGEngine

print("Initializing RAG Engine (loading 250k drugs)...")
start_load = time.time()
rag = RAGEngine()
print(f"Loaded in {time.time() - start_load:.2f}s")

def test_lookup(name):
    start = time.time()
    corrected, score = rag.reconcile_medicine(name)
    duration = time.time() - start
    print(f"Lookup '{name}' -> '{corrected}' (Score: {score:.1f}) took {duration:.4f}s")

print("\n--- Performance Benchmarks ---")
test_lookup('Progut')
test_lookup('Pantoprazol')
test_lookup('Augmentin')
test_lookup('Dolo 650')
test_lookup('Paracip') 
test_lookup('SomeRandomDrugThatDoesntExist')

print("\n--- Validation Logic ---")
strength_corr, valid, msg = rag.validate_strength('Progut', '200mg')
print(f"Strength '200mg' for Progut -> {strength_corr} (Valid: {valid})")
