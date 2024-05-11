from bs4 import BeautifulSoup
import json

def extract_product_info(html):
    soup = BeautifulSoup(html, 'html.parser')

    products = []
    for product_div in soup.find_all('div', class_='SEARCH'):
        name_tag = product_div.find('strong', {'data-target': '#productModal'})
        name = name_tag.text.strip() if name_tag else "Name not found"

        price_tag = product_div.find('span', itemprop='price')
        price = price_tag.text.strip() if price_tag else "Price not found"

        price_per_unit_tag = product_div.find('div', class_='pricePerUnit')
        price_per_unit = price_per_unit_tag.text.strip().split()[0] if price_per_unit_tag else "Price per unit not found"

        products.append({
            'name': name,
            'price': price,
            'price_per_unit': price_per_unit
        })

    return products

def main():
    with open('src/pages/meat.html', 'r', encoding='utf-8') as f:
        html_content = f.read()

    products = extract_product_info(html_content)

    with open('src/output/meat.json', 'w', encoding='utf-8') as f:  # Changed output file name
        json.dump(products, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    main()
