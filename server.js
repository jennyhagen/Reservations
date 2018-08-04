<<<<<<< HEAD
// @Dependencies
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const {sendFile, isValid} = require('./helpers')

// @Boilerplate
const app = express()
const PORT = 8000

// @Database (Mock)
const tables = []
const waitlist = []

// @Middleware
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

// @Routes
app.get('/:endpoint?', function (req, res) {
  switch (req.params.endpoint) {
    case undefined:
    case '/':
      sendFile(res, 'index.html')
      break
    case 'reserve':
      sendFile(res, 'reserve.html')
      break
    case 'tables':
      sendFile(res, 'tables.html')
      break
    default:
      sendFile(res, '404.html')
      break
  }
})

app.get('/api/:endpoint?', function (req, res) {
  switch (req.params.endpoint) {
    case 'tables':
      res.json(tables)
      break
    case 'waitlist':
      res.json(tables.slice(5))
      break
    default:
      res.status(404).json({error: 'Not Found'})
      break
  }
})

app.post('/tables', function (req, res) {
  const table = req.body

  let response
  if (!isValid(table)) {
    res.status(400)
    response = {error: 'Malformed input. Check your submission and try again.'}
  } else {
    res.status(201)
    tables.push(table)
  }

  res.json(response)
})

// @Start
app.listen(PORT, function (err) {
  if (err) {
    return console.error(err)
  }

  console.log(`Listening on port ${PORT}.`)
})
=======
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

app.get("/api/reservations", function(req, res) {
    return res.json(reservations);
});

// Displays a single character, or returns false
app.get("/api/reservations/:reservation", function(req, res) {
    var chosen = req.params.reservation;

    console.log(chosen);

    for (var i = 0; i < reservations.length; i++) {
        if (chosen === reservations[i].routeName) {
            return res.json(reservations[i]);
        }
    }

    return res.json(false);
});

app.post("/api/reservations", function(req, res) {
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
>>>>>>> fe325a4a1552c582cf44927ce2fdf04ecd0cd909
