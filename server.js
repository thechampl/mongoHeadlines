// Using the tools and techniques you learned so far,
// you will scrape a website of your choice, then place the data
// in a MongoDB database. Be sure to make the database and collection
// before running this exercise.

// Consult the assignment files from earlier in class
// if you need a refresher on Cheerio.

// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);

db.on("error", function (error) {
  console.log("Database Error:", error);
});

// Main route (simple Hello World Message)
app.get("/", function (req, res) {
  res.send("Hello world");
});

// TODO: make two more routes

// Route 1
// =======
// This route will retrieve all of the data
// from the scrapedData collection as a json (this will be populated
// by the data you scrape using the next route)

app.get("/all", function (req, res) {
  // Query: In our database, go to the animals collection, then "find" everything
  db.scrapedData.find({}, function (error, found) {
    // Log any errors if the server encounters one
    if (error) {
      console.log(error);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});

// Route 2
// =======
// When you visit this route, the server will
// scrape data from the site of your choice, and save it to
// MongoDB.
// TIP: Think back to how you pushed website data
// into an empty array in the last class. How do you
// push it into a MongoDB collection instead?

app.get("/scrape", function (req, res) {
  db.scrapedData.drop();

  request("https://stackoverflow.com", function (error, response, html) {
    var $ = cheerio.load(html);

    $("div.summary").each(function (i, element) {

      var link = $(element).find("a").attr("href");
      var title = $(element).find("a").children().text();

      db.scrapedData.insert({
        title: title,
        link: "https://stackoverflow.com" + link
      })
    });

    res.send("Scraped!");
  });
});

// Listen on port 3000
app.listen(3000, function () {
  console.log("App running on port 3000!");
})