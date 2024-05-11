from bs4 import BeautifulSoup
import json

def extract_product_info(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    products = []

    for item in soup.find_all('div', class_='SEARCH'):
        product = {}
        
        # Extracting product name
        product['name'] = item.find('strong').text.strip()
        
        # Extracting product weight and store
        weight_span = item.find('div', class_='brand-name').find('span')
        product['weight'] = weight_span.text.strip()
        
        # Extracting product price if available
        price_span = item.find('span', class_='price')
        if price_span:
            price_number = price_span.find('span', class_='number')
            if price_number:
                product['price'] = float(price_number.text.strip())
            else:
                product['price'] = None
        else:
            product['price'] = None
        
        products.append(product)

    return products

def main():
    # Read HTML file
    with open('src/pages/baking.html', 'r', encoding='utf-8') as file:
        html_content = file.read()

    # Extract product information
    products = extract_product_info(html_content)

    # Write product information to JSON file
    with open('src/output/baking.json', 'w', encoding='utf-8') as json_file:
        json.dump(products, json_file, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    main()
