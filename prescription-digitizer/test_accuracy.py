import sys
import os
from dotenv import load_dotenv
from rich.console import Console
from rich.panel import Panel

# Add current directory to path so we can import core/debug_monitor
sys.path.append(os.getcwd())

from core.vlm_connector import GeminiConnector
from debug_monitor.logger import logger

console = Console()

def run_test(image_path):
    if not os.path.exists(image_path):
        console.print(f"[red]Error: File {image_path} not found.[/red]")
        return

    load_dotenv()
    if not os.getenv("GEMINI_API_KEY"):
        console.print("[yellow]Warning: GEMINI_API_KEY not set in .env[/yellow]")
        console.print("Please set your API key to run the test.")
        return

    connector = GeminiConnector()
    
    console.print(Panel(f"Starting Accuracy Test for: [bold blue]{image_path}[/bold blue]"))
    
    # Test Quick Mode
    console.print("
[bold]Testing QUICK Mode...[/bold]")
    quick_result = connector.digitize_image(image_path, mode="QUICK")
    console.print(Panel(quick_result, title="Quick Mode Output", border_style="green"))
    
    # Test Extended Mode
    console.print("
[bold]Testing EXTENDED Mode...[/bold]")
    extended_result = connector.digitize_image(image_path, mode="EXTENDED")
    console.print(Panel(extended_result, title="Extended Mode Output", border_style="blue"))
    
    console.print("
[bold green]Test Complete![/bold green] Check [cyan]logs/scientific_debug.log[/cyan] for performance metrics.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        console.print("[red]Usage: python3 test_accuracy.py <image_path>[/red]")
    else:
        run_test(sys.argv[1])
