import logging
import os
from datetime import datetime

class ScientificLogger:
    def __init__(self, log_dir="logs", log_file="scientific_debug.log"):
        os.makedirs(log_dir, exist_ok=True)
        self.log_path = os.path.join(log_dir, log_file)
        
        self.logger = logging.getLogger("ScientificDebug")
        self.logger.setLevel(logging.DEBUG)
        
        # Prevent duplicate handlers
        if not self.logger.handlers:
            file_handler = logging.FileHandler(self.log_path)
            formatter = logging.Formatter(
                '%(asctime)s | %(levelname)-8s | %(module)s | %(funcName)s | %(message)s'
            )
            file_handler.setFormatter(formatter)
            self.logger.addHandler(file_handler)
            
            # Also log to console for development
            console_handler = logging.StreamHandler()
            console_handler.setFormatter(formatter)
            self.logger.addHandler(console_handler)

    def get_logger(self):
        return self.logger

# Global instance for easy access
logger = ScientificLogger().get_logger()
