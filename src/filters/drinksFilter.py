from bs4 import BeautifulSoup
import json
import os

def extract_product_info(product):
    name_element = product.find("span", class_="description")
    if name_element:
        name = name_element.text.strip()
    else:
        return None
    
    price_element = product.find("span", class_="priceTxt")
    if price_element:
        price_span = price_element.find("span", class_="number")
        price = price_span.text.strip() if price_span else "N/A"
        
        currency_element = price_element.find("span", class_="currency")
        currency = currency_element.text.strip() if currency_element else "N/A"
    else:
        price = "N/A"
        currency = "N/A"

    if price != "N/A" and currency != "N/A":
        price = f"{price} {currency}"
    return {
        "name": name,
        "price": price,
    }

def run_filter(html_file, output_file):
    # Open the HTML file for reading
    with open(html_file, "r", encoding="utf-8") as f:
        html_content = f.read()

    # Parse the HTML content
    soup = BeautifulSoup(html_content, "html.parser")

    # Find all product elements
    products = soup.find_all("div", class_="text")

    # Initialize a list to store extracted data
    cleaned_data = []

    # Iterate over each product and extract required information
    for product in products:
        product_info = extract_product_info(product)
        if product_info and product_info["price"] != "N/A":
            cleaned_data.append(product_info)

    # Save the extracted data to a JSON file in the output directory
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(cleaned_data, f, ensure_ascii=False, indent=4)

    print(f"Filter applied to {html_file} and saved results to {output_file}")

# Run the filter for baby_stuff.html
input_path = os.path.join("src", "pages", "drinks.html")
output_path = os.path.join("src", "output", "drinks.json")
run_filter(input_path, output_path)

print("Filter applied successfully.")
