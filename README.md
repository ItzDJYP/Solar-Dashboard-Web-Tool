## Project Description

This is a solar panel dashboard that allows the user to input their Roof size in kWDC and (optionally) convert the roof area and predetermined panel power
density into kW DC format to calculate the customers Upfront Cost, Annual Generation, IRR and payback peroid for either a residential, commercial or average (combined) customer.
Additionally, this uses math using electricity prices as of the month September of 2025 to calclate the annual cash flow and cumulative cash flow and displays it in a 25 year flow table and flow chart.

## Flowchart Journey

[ index.html ]  
    ↓ (loads the React app)  
[ main.jsx ]  
    ↓ (mounts App into the DOM)  
[ App.jsx ]  
    ├──> [ Components ]  
    │        ├── Inputs.jsx   (user provides system size, state, etc.)  
    │        ├── SummaryCards.jsx   (displays summary metrics)  
    │        ├── CashFlowChart.jsx  (renders charts with finance data)  
    │        └── CashFlowTable.jsx  (renders tables with finance data)  
    │  
    └──> [ Utils ]  
             ├── finance.js     (calculations for ROI, payback, etc.)  
             ├── statePrices.js (state-level solar prices)  
             └── priceTool.js   (helper functions for pricing)  

Flow of data:  
User Input (Inputs.jsx)  
    → passes values to App.jsx  
        → App.jsx calls functions from Utils (finance.js, statePrices.js, priceTool.js)  
            → returns processed results  
                → SummaryCards.jsx, CashFlowChart.jsx, CashFlowTable.jsx  
                    → display results as metrics, charts, and tables  

## Repository Structure

Solar-Dashboard-Web-Tool-main/
    .gitignore
    package-lock.json
    package.json
    solar-dashboard/
        .gitignore
        README.md
        eslint.config.js
        index.html
        logo.svg
        package-lock.json
        package.json
        vite.config.js
        public/
            favicon.ico
            index.html
            logo192.png
            logo512.png
            manifest.json
            robots.txt
            vite.svg
            assets/
                background-demo.jpeg
        src/
            App.jsx
            App.test.js
            index.css
            main.jsx
            reportWebVitals.js
            setupTests.js
            components/
                CashFlowChart.jsx
                CashFlowTable.jsx
                Inputs.jsx
                SummaryCards.jsx
            utils/
                finance.js
                priceTool.js
                statePrices.js

## How to Use
Step 1: Download the repo using any method (downloading the zip file, opening in visual studio, opening through github desktop. whichever is the most comfortable to you)

Step 2: Open your IDE or code editor and install all dependencies and node modules using the following commands below:
cd solar-dashboard
npm instal

Step 3: Run the local environment using the following code:
npm run dev

Step4: Go to  http://localhost:5173/ as the website should be running there.

## Documentation
Link: https://docs.google.com/document/d/1UkvgVe9MCFp0rBqwrQ8fOSnwHO9Z06gyj4FOratf4kg/edit?usp=sharing