import psutil
import os
from .logger import logger

class Telemetry:
    @staticmethod
    def get_stats():
        process = psutil.Process(os.getpid())
        mem_info = process.memory_info()
        cpu_percent = psutil.cpu_percent(interval=None)
        
        stats = {
            "ram_mb": mem_info.rss / (1024 * 1024),
            "cpu_percent": cpu_percent
        }
        return stats

    @staticmethod
    def log_stats(label="Current Stats"):
        stats = Telemetry.get_stats()
        logger.debug(f"{label} -> RAM: {stats['ram_mb']:.2f}MB | CPU: {stats['cpu_percent']}%")
