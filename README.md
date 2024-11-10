# NGO Scraper for WASH Organizations

This project uses Node.js and Puppeteer to scrape data about Water, Sanitation, and Hygiene (WASH) focused NGOs from [https://ngobase.org](https://ngobase.org).

## Features

* Scrapes NGO details including name, logo, work areas, website, Facebook page, city, country, and a brief introduction.
* Navigates through multiple pages of search results to collect comprehensive data.
* Exports the scraped data into a structured CSV file (`ngos_data.csv`).

## Requirements

* **Node.js:** Download and install from [https://nodejs.org/](https://nodejs.org/).
* **npm:** Node Package Manager comes bundled with Node.js.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ngobase-scrapper.git
    ```
2. Navigate to the project directory:
    ```
   cd ngobase-scrapper
    ```
3. Install the required dependencies:
npm install


### Usage
1. Run the scraper:
    ```
    node index.js
    ```
The script will scrape data from pages 1 to 83 of the NGO search results.
Once complete, a file named ngos_data.csv will be created in the project directory containing the scraped data.

### Data Format
The ngos_data.csv file contains the following columns:

- `name`: Name of the NGO.

- `logo`: URL of the NGO's logo.

- `workAreas`: Work areas of the NGO, formatted as "Area -> Sub-Area; Area -> Sub-Area".

- `website`: URL of the NGO's website.

- `facebook`: URL of the NGO's Facebook page.

- `city`: City where the NGO is located.

- `country`: Country where the NGO is located.

- `briefIntro`: A brief introduction to the NGO.