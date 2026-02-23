import functools
import time
import psutil
import os
from .logger import logger

def trace(func):
    """
    Decorator that logs function entry/exit, execution time, 
    and memory change during the operation.
    """
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        process = psutil.Process(os.getpid())
        mem_before = process.memory_info().rss / (1024 * 1024)  # MB
        
        start_time = time.perf_counter()
        
        logger.info(f"ENTERING: {func.__name__}")
        
        try:
            result = func(*args, **kwargs)
            
            end_time = time.perf_counter()
            duration = end_time - start_time
            
            mem_after = process.memory_info().rss / (1024 * 1024)  # MB
            mem_delta = mem_after - mem_before
            
            logger.info(
                f"EXITING: {func.__name__} | "
                f"Duration: {duration:.4f}s | "
                f"Mem Delta: {mem_delta:+.2f}MB"
            )
            return result
            
        except Exception as e:
            logger.error(f"EXCEPTION in {func.__name__}: {str(e)}", exc_info=True)
            raise
            
    return wrapper
