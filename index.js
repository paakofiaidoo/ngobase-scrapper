const puppeteer = require('puppeteer');
const fs = require('fs');
const { Parser } = require('json2csv');

// Function to scrape data from a single page
async function scrapePage(page, pageNum) {
    await page.goto(`https://ngobase.org/swa/HLT.WS/wash-ngos-charities?page=${pageNum}`, {
        waitUntil: 'networkidle2'
    });

    // Wait for the main NGO listing container to load
    await page.waitForSelector('.ngo_listing_div');

    // Extract data for each NGO
    return await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.ngo_listing_div')).map(ngo => {
            const name = ngo.querySelector('.ngo_name span[itemprop="name"] a')?.textContent.trim();
            const logo = ngo.querySelector('.listing_logo_img')?.src;
            const workAreas = Array.from(ngo.querySelectorAll('.ngo_listing_work_area_li')).map(workArea => {
                const area = workArea.querySelector('.work_area')?.textContent.trim();
                const subArea = workArea.querySelector('.sub_work_area')?.textContent.trim();
                return `${area} -> ${subArea}`;
            }).join('; '); // Join multiple work areas into a single string for CSV

            const website = ngo.querySelector('a[title*="website"][itemprop="url"]')?.href;
            const facebook = ngo.querySelector('a[title*="facebook"][itemprop="url"]')?.href;
            const city = ngo.querySelector('.listing_locations:nth-of-type(1)')?.textContent.trim();
            const country = ngo.querySelector('.listing_locations:nth-of-type(2)')?.textContent.trim();
            const briefIntro = ngo.querySelector('.brief_intro_row .col')?.textContent.trim();

            return {
                name,
                logo,
                workAreas,
                website,
                facebook,
                city,
                country,
                briefIntro
            };
        });
    });
}

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const allData = [];

    // Loop through each page from 2 to 83
    for (let pageNum = 1; pageNum <= 83; pageNum++) {
        console.log(`Scraping page ${pageNum}...`);
        const pageData = await scrapePage(page, pageNum);
        allData.push(...pageData); // Add data from this page to the main array
    }

    await browser.close();

    // Convert data to CSV
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(allData);

    // Save to CSV file
    fs.writeFileSync('ngos_data.csv', csv);
    console.log('Data saved to ngos_data.csv');
})();