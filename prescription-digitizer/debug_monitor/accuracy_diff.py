from rapidfuzz.distance import Levenshtein
from debug_monitor.instrumentation import trace

class AccuracyDiff:
    @trace
    def compare(self, quick_text, extended_text):
        """
        Compares Quick vs Extended outputs.
        Returns a dict with similarity score and error classification.
        """
        # Normalize text
        q_norm = quick_text.lower().strip()
        e_norm = extended_text.lower().strip()
        
        # Calculate Levenshtein distance
        dist = Levenshtein.distance(q_norm, e_norm)
        max_len = max(len(q_norm), len(e_norm))
        
        if max_len == 0:
            return {"similarity_percent": 100.0, "distance": 0, "errors": []}
            
        similarity = (1 - (dist / max_len)) * 100
        
        # Simple error classification (heuristic)
        errors = []
        if len(e_norm) > len(q_norm) + 10:
            errors.append("INSERTION: Extended mode found significantly more text.")
        elif len(q_norm) > len(e_norm) + 10:
            errors.append("DELETION: Extended mode output is significantly shorter.")
            
        if similarity < 80:
            errors.append("Significant divergence between Quick and Extended.")
            
        return {
            "similarity_percent": round(similarity, 2),
            "distance": dist,
            "errors": errors
        }
