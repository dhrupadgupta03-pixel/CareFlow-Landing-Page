import requests
from bs4 import BeautifulSoup
import json
import time
import random

USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
]

class MedicineScraper:
    def get_headers(self):
        return {"User-Agent": random.choice(USER_AGENTS)}

    def scrape_1mg(self, search_term="paracetamol"):
        """Scrapes 1mg.com for a given search term."""
        url = f"https://www.1mg.com/search/all?name={search_term}"
        try:
            response = requests.get(url, headers=self.get_headers(), timeout=10)
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')
                # Note: Exact selectors depend on 1mg's current DOM, using generic placeholders
                # intended for demonstration of the logic
                results = []
                cards = soup.find_all("div", class_="style__pro-title___2PRL7") # Example selector
                for card in cards[:5]:
                    results.append({"name": card.text.strip(), "source": "1mg"})
                return results
        except Exception as e:
            print(f"Error scraping 1mg: {e}")
        return []

    def scrape_netmeds(self, search_term="paracetamol"):
        """Scrapes Netmeds.com for a given search term."""
        url = f"https://www.netmeds.com/catalogsearch/result?q={search_term}"
        try:
            response = requests.get(url, headers=self.get_headers(), timeout=10)
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')
                results = []
                cards = soup.find_all("div", class_="clsgetname") # Example selector
                for card in cards[:5]:
                    results.append({"name": card.text.strip(), "source": "netmeds"})
                return results
        except Exception as e:
            print(f"Error scraping Netmeds: {e}")
        return []

    def scrape_cdsco(self):
        """
        Placeholder for CDSCO scraping. 
        CDSCO data often requires PDF parsing or complex form submission.
        """
        return [{"name": "Paracetamol 500mg", "source": "CDSCO"}] # Mock data

    def run_cycle(self):
        print("Starting scraping cycle...")
        # In production, this would loop through a seed list of chemicals/diseases
        results = []
        results.extend(self.scrape_1mg())
        time.sleep(2)
        results.extend(self.scrape_netmeds())
        time.sleep(2)
        results.extend(self.scrape_cdsco())
        return results
