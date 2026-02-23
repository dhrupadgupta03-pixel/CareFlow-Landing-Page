import cv2
import numpy as np
from debug_monitor.instrumentation import trace

class ImagePreprocessor:
    @trace
    def preprocess(self, image_path, output_path=None):
        """
        Applies contrast enhancement, noise removal, and deskewing.
        Returns the processed image.
        """
        image = cv2.imread(image_path)
        if image is None:
            raise ValueError(f"Could not read image at {image_path}")
            
        # 1. Grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # 2. Noise Removal (Gaussian Blur)
        blurred = cv2.GaussianBlur(gray, (5, 5), 0)
        
        # 3. Adaptive Thresholding (Binarization)
        thresh = cv2.adaptiveThreshold(
            blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
            cv2.THRESH_BINARY, 11, 2
        )
        
        # 4. Deskewing
        coords = np.column_stack(np.where(thresh > 0))
        angle = cv2.minAreaRect(coords)[-1]
        
        if angle < -45:
            angle = -(90 + angle)
        else:
            angle = -angle
            
        (h, w) = image.shape[:2]
        center = (w // 2, h // 2)
        M = cv2.getRotationMatrix2D(center, angle, 1.0)
        rotated = cv2.warpAffine(
            thresh, M, (w, h), 
            flags=cv2.INTER_CUBIC, 
            borderMode=cv2.BORDER_REPLICATE
        )
        
        if output_path:
            cv2.imwrite(output_path, rotated)
            
        return rotated
