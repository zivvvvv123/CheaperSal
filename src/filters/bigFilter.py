from bs4 import BeautifulSoup
import json
import os

def run_filter(html_file, output_file):
    # Open the HTML file for reading
    with open(html_file, "r", encoding="utf-8") as f:
        html_content = f.read()

    # Parse the HTML content
    soup = BeautifulSoup(html_content, "html.parser")

    # Find all product elements
    products = soup.find_all("div", class_="text description")

    # Initialize a list to store extracted data
    cleaned_data = []

    # Iterate over each product and extract required information
    for product in products:
        name_element = product.find("span")
        if name_element:
            name = name_element.text.strip()
        else:
            name = "N/A"
        
        # Check if the next sibling exists before searching for the "line" element
        next_sibling = product.find_next_sibling("div", class_="line")
        if next_sibling:
            price_element = next_sibling.find("span", class_="number")
            price = price_element.text.strip() if price_element else None
        else:
            price = None
        
        # Check if the next sibling exists before searching for the "flex-line" element
        next_sibling = product.find_next_sibling("div", class_="flex-line")
        if next_sibling:
            price_per_kg_element = next_sibling.find("div", class_="smallText")
            price_per_kg = price_per_kg_element.text.strip() if price_per_kg_element else "N/A"
        else:
            price_per_kg = "N/A"

        # Append the extracted data to the list
        cleaned_data.append({
            "name": name,
            "price": price,
            "price_per_kg": price_per_kg
        })

    # Save the extracted data to a JSON file in the output directory
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(cleaned_data, f, ensure_ascii=False, indent=4)

    print(f"Filter applied to {html_file} and saved results to {output_file}")

# Get the directory of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Paths to HTML and output directories
html_dir = os.path.join(script_dir, "..", "pages")
output_dir = os.path.join(script_dir, "..", "output")

# List of HTML files to filter
html_files = [
    "baby_stuff.html",
    "baking.html",
    "cleaning.html",
    "cooking and canned food.html",
    "dairy.html",
    "drinks.html",
    "fruits and vegetables.html",
    "meat.html",
    "snacks.html"
]

# Run the filter on each HTML file
for html_file in html_files:
    input_path = os.path.join(html_dir, html_file)
    output_path = os.path.join(output_dir, html_file.replace(".html", ".json"))
    run_filter(input_path, output_path)

print("All filters applied successfully.")





