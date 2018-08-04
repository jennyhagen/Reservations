// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

// Create new reservation - takes in JSON input
app.post("/", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newres = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newres.routeName = newres.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newres);
  
    characters.push(newres);
  
    res.json(newres);
  });

// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });