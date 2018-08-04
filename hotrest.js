var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var reservations = [
    {
        routeName: "yoda",
        name: "Yoda",
        number: 5555555,
        email: "bob@yoda.com",
        uniqueid: 2000
    },
    {
        routeName: "darthmaul",
        name: "Darth Maul",
        number: 6669999,
        email: "cookies@darkside.com",
        uniqueid: 1200
    },
    {
        routeName: "obiwankenobi",
        name: "Obi Wan Kenobi",
        number: 5554545,
        email: "old.man@kenobi.com",
        uniqueid: 1350
    }
];

app.get("/api/reservations", function (req, res) {
    return res.json(reservations);
});

// Displays a single character, or returns false
app.get("/api/reservations/:reservation", function (req, res) {
    var chosen = req.params.reservation;

    console.log(chosen);

    for (var i = 0; i < reservations.length; i++) {
        if (chosen === reservations[i].routeName) {
            return res.json(reservations[i]);
        }
    }

    return res.json(false);
});

app.post("/api/reservations", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newreservation = req.body;

    // Using a RegEx Pattern to remove spaces from newreservation
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newreservation.routeName = newreservation.name.replace(/\s+/g, "").toLowerCase();

    console.log(newreservation);

    reservations.push(newreservation);

    res.json(newreservation);
});