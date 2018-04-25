




"use strict";
// Setup Express
const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.static(__dirname + '/public'));
// Setup Body Parser
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
// Setup Handlebars Engine
const exphandbars = require("express-handlebars");
app.engine("handlebars", exphandbars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Import Routes
const routes = require("./controller/controller");
app.use("/", routes);

var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");
// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];
var mongoose= require("mongoose")

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);

db.on("error", function (error) {
    console.log("Database Error:", error);
});

// // / If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
    useMongoClient: true
});





// TODO: make two more routes

// Route 1
// =======
// This route will retrieve all of the data
// from the scrapedData collection as a json (this will be populated
// by the data you scrape using the next route)

app.get("/all", function (req, res) {
    // Query: In our database, go to the animals collection, then "find" everything
    db.mongoHeadlines.find({}, function (error, found) {
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
    db.mongoHeadlines.drop();

    request("https://stackoverflow.com", function (error, response, html) {
        var $ = cheerio.load(html);

        $("a.question-hyperlink").each(function (i, element) {

            var link = $(element).attr("href");
            var title = $(element).text();

            db.mongoHeadlines.insert({
                title: title,
                link: "https://stackoverflow.com" + link,
                favorite: false
            })
        });

        res.redirect("/");
    });
});

app.get("/favorites/", function (req, res) {
    // Query: In our database, go to the animals collection, then "find" everything
    db.mongoHeadlines.find({favorite: true}, function (error, found) {
        // Log any errors if the server encounters one
        if (error) {
            console.log(error);
        }
        // Otherwise, send the result of this query to the browser
        else {
            res.json(found)

        }
        
    });
});
app.get("/favorites/:id", function (req, res) {
 var reqid= req.params.id
console.log(reqid)
db.mongoHeadlines.update(
    {_id : reqid},
    {"favorite": true},
    // {favorite: true},
    function (error, found){
        if (error) {
            console.log(error);
        }
        // Otherwise, send the result of this query to the browser
        else {
            console.log(found)

        }
    });

});






// Listen on port 3000
app.listen(3000, function () {
    console.log("App running on port 3000!");
})
