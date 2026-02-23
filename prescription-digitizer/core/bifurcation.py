import cv2
import numpy as np
import os
from debug_monitor.instrumentation import trace

class ImageBifurcator:
    def __init__(self, output_dir="temp_segments"):
        self.output_dir = output_dir
        os.makedirs(output_dir, exist_ok=True)

    @trace
    def segment_lines(self, image_path):
        """
        Segments the prescription image into line-level images.
        """

        
        image = cv2.imread(image_path)
        if image is None:
            raise ValueError(f"Could not read image at {image_path}")
            
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Adaptive thresholding to handle lighting variations
        thresh = cv2.adaptiveThreshold(
            gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
            cv2.THRESH_BINARY_INV, 11, 2
        )
        
        # Dilation to merge characters into lines
        kernel = np.ones((5, 100), np.uint8) # Wide kernel for lines
        dilated = cv2.dilate(thresh, kernel, iterations=1)
        
        # Find contours
        contours, _ = cv2.findContours(
            dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
        )
        
        segments = []
        for i, cnt in enumerate(reversed(contours)): # Reversed to go top-down
            x, y, w, h = cv2.boundingRect(cnt)
            
            # Filter out noise (very small contours)
            if h < 20 or w < 50:
                continue
                
            roi = image[y:y+h, x:x+w]
            segment_path = os.path.join(self.output_dir, f"line_{i}.png")
            cv2.imwrite(segment_path, roi)
            segments.append(segment_path)
            
        return segments
