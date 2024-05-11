const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

// Function to save HTML content to a file
async function savePageHTML(url, htmlContent, names) {
  const fileName = names[url] || "index"; // Use URL name or "index" if not found
  const directoryPath = path.join(__dirname, "..", "pages"); // Adjusted directory path
  const filePath = path.join(directoryPath, fileName + ".html");

  try {
    // Check if the directory exists, create it if it doesn't
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    await fs.promises.writeFile(filePath, htmlContent);
    console.log(`Saved ${fileName}.html`);
  } catch (error) {
    console.error(`Error saving ${fileName}.html:`, error);
  }
}

// Empty array for URLs to visit
const urlsToVisit = [
  {
    url: "https://www.shufersal.co.il/online/he/%D7%A7%D7%98%D7%92%D7%95%D7%A8%D7%99%D7%95%D7%AA/%D7%A1%D7%95%D7%A4%D7%A8%D7%9E%D7%A8%D7%A7%D7%98/%D7%A0%D7%99%D7%A7%D7%99%D7%95%D7%9F-%D7%94%D7%91%D7%99%D7%AA-%D7%95%D7%97%D7%93-%D7%A4%D7%A2%D7%9E%D7%99/c/A34?shuf_source=shufersal_icon_dy&shuf_medium=iconA&shuf_campaign=clean&shuf_content=shufersal_clean_270623&shuf_term=dy",
    name: "cleaning",
  },
  {
    url: "https://www.shufersal.co.il/online/he/%D7%A7%D7%98%D7%92%D7%95%D7%A8%D7%99%D7%95%D7%AA/%D7%A1%D7%95%D7%A4%D7%A8%D7%9E%D7%A8%D7%A7%D7%98/%D7%97%D7%9C%D7%91-%D7%95%D7%91%D7%99%D7%A6%D7%99%D7%9D/c/A01?shuf_source=shufersal_icon_dy&shuf_medium=iconA&shuf_campaign=milk&shuf_content=shufersal_milk_270623&shuf_term=dy",
    name: "dairy",
  },
  {
    url: "https://www.shufersal.co.il/online/he/%D7%A7%D7%98%D7%92%D7%95%D7%A8%D7%99%D7%95%D7%AA/%D7%A1%D7%95%D7%A4%D7%A8%D7%9E%D7%A8%D7%A7%D7%98/%D7%A4%D7%99%D7%A8%D7%95%D7%AA-%D7%95%D7%99%D7%A8%D7%A7%D7%95%D7%AA/c/A04?shuf_source=shufersal_icon_dy&shuf_medium=iconA&shuf_campaign=yrp&shuf_content=shufersal_yrp_270623&shuf_term=dy",
    name: "fruits and vegetables",
  },
  {
    url: "https://www.shufersal.co.il/online/he/A07?shuf_source=shufersal_icon_dy&shuf_medium=iconA&shuf_campaign=meat&shuf_content=shufersal_meat_270623&shuf_term=dy",
    name: "meat",
  },
  {
    url: "https://www.shufersal.co.il/online/he/A10?shuf_source=shufersal_icon_dy&shuf_medium=iconA&shuf_campaign=bakery&shuf_content=shufersal_bakery_270623&shuf_term=dy",
    name: "baking",
  },
  {
    url: "https://www.shufersal.co.il/online/he/A13?shuf_source=shufersal_icon_dy&shuf_medium=iconA&shuf_campaign=drinks&shuf_content=shufersal_drinks_270623&shuf_term=dy",
    name: "drinks",
  },
  {
    url: "https://www.shufersal.co.il/online/he/%D7%A7%D7%98%D7%92%D7%95%D7%A8%D7%99%D7%95%D7%AA/%D7%A1%D7%95%D7%A4%D7%A8%D7%9E%D7%A8%D7%A7%D7%98/%D7%91%D7%99%D7%A9%D7%95%D7%9C-%D7%90%D7%A4%D7%99%D7%94-%D7%95%D7%A9%D7%99%D7%9E%D7%95%D7%A8%D7%99%D7%9D/c/A22?shuf_source=shufersal_icon_dy&shuf_medium=iconA&shuf_campaign=cooking&shuf_content=shufersal_cooking_270623&shuf_term=dy",
    name: "cooking and canned food",
  },
  {
    url: "https://www.shufersal.co.il/online/he/%D7%A7%D7%98%D7%92%D7%95%D7%A8%D7%99%D7%95%D7%AA/%D7%A1%D7%95%D7%A4%D7%A8%D7%9E%D7%A8%D7%A7%D7%98/%D7%97%D7%98%D7%99%D7%A4%D7%99%D7%9D-%D7%9E%D7%AA%D7%95%D7%A7%D7%99%D7%9D-%D7%95%D7%93%D7%92%D7%A0%D7%99-%D7%91%D7%95%D7%A7%D7%A8/c/A25?shuf_source=shufersal_icon_dy&shuf_medium=iconA&shuf_campaign=snacks&shuf_content=shufersal_snacks_270623&shuf_term=dy",
    name: "snacks",
  },
  {
    url: "https://www.shufersal.co.il/online/he/A31?shuf_source=shufersal_icon_dy&shuf_medium=iconA&shuf_campaign=pharm&shuf_content=shufersal_pharm_270623&shuf_term=dy",
    name: "baby_stuff",
  },
];

(async () => {
  // Launch Puppeteer
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // Initialize a set to keep track of visited URLs
  const visitedUrls = new Set();

  // Crawl each URL
  for (const { url, name } of urlsToVisit) {
    if (!visitedUrls.has(url)) {
      // Visit the URL
      await page.goto(url, { waitUntil: "networkidle2" }); // Wait for network activity to be idle

      // Wait for the specific selector to appear
      await page.waitForSelector(".imgContainer");

      // Continuously scroll until all products are loaded
      await autoScroll(page);

      // Get the page HTML content after it's fully loaded
      const htmlContent = await page.evaluate(
        () => document.documentElement.outerHTML
      );

      // Save the HTML content to a file with the specified name
      await savePageHTML(url, htmlContent, { [url]: name });

      // Add the URL to the set of visited URLs
      visitedUrls.add(url);
    }
  }

  // Close the browser
  await browser.close();

  // Function to continuously scroll until all products are loaded
  async function autoScroll(page) {
    let previousHeight = 0;
    let scrollAttempts = 0;
    const maxScrollAttempts = 150; // Adjust this value as needed

    while (scrollAttempts < maxScrollAttempts) {
      // Scroll to the bottom of the page
      await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");

      // Wait for a short interval to allow content loading
      await delay(5000); // Wait for 4 seconds; adjust as needed

      // Get the current scroll height
      const currentHeight = await page.evaluate("document.body.scrollHeight");

      // If the current scroll height hasn't changed, it means all content is loaded
      if (currentHeight === previousHeight) {
        break;
      }

      // Update the previous scroll height and increment scroll attempts
      previousHeight = currentHeight;
      console.log(scrollAttempts, currentHeight);
      scrollAttempts++;
    }
  }

  // Function to create a delay
  function delay(time) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }
})();
