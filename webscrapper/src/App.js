import React from "react";
import Table from "./components/Content";

function App() {
  return (
    <div>
      <h1>Hello users :)</h1>
      <h2>This web-scrapper can only scrape the Annual Reports of Infosys</h2>
      <p>
        https://www.infosys.com/investors/reports-filings/annual-report/annual-reports.html
      </p>
      <h5>
        Please copy paste the url in the input field and click the Scape button
        to see the magic😁
      </h5>
      <Table />
    </div>
  );
}

export default App;
