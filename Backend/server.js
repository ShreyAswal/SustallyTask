require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const bodyParser = require("body-parser");

// express  app
const app = express();

//middleware
app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
app.post("/scrape", async (req, res) => {
  const url = req.body.url;
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    // const websiteText = $('body').text();
    // const websiteText = $("body").text().replace(/\s+/g, "\n").trim();
    // const years = websiteText.match(/\b\d{4}\b/g);

    const links = [];
    const imgs = [];
    const years = [];

    $(
      'div.table-fluid.table-wrap table tbody tr td[title="Annual Reports"]'
    ).each((i, elem) => {
      const link = $(elem).find("a:first-child").attr("href");
      // const title = $(elem).text().trim()
      // const title =
      if (link) links.push("https://infosys.com"+link);
      else links.push("-");
      // imgs.push($(elem).)
    });

    $(
      'div.table-fluid.table-wrap table tbody tr td[title="Annual Reports"]'
    ).each((i, elem) => {
      const img = $(elem).find("a:first-child").find("img").attr("src");
      if(img)
      imgs.push("https://infosys.com"+img)
      else
      imgs.push("No Documents Found!")
      
    });

    $("div.table-fluid.table-wrap table tbody tr td strong").each((i, elem) => {
      const text = $(elem).text().trim();
      if (text.match(/^\d{4}-\d{2}$/)) {
        const year = text.split("-")[0];
        years.push(year);
      }
    });

    const results = {
      links,
      imgs,
      years,
    };

    res.status(200).send(results);
  } catch (error) {
    res.status(500).send(error);
  }
});

//listen for request
app.listen(process.env.PORT, () => {
  console.log("Connected to port :" + process.env.PORT);
});
