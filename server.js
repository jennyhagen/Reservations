// @Dependencies
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
var path = require("path");


// @Boilerplate
const app = express()
const PORT = process.env.PORT || 3000;

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
// // app.get('/:endpoint?', function(req, res) {
//     switch (req.params.endpoint) {
//         case undefined:
//             break
//         case '/':
//             res.sendFile(path.join(__dirname, "index.html"));
//             break
//         case 'reserve':
//             res.sendFile(res, 'reserve.html')
//             break
//         case 'tables':
//             res.sendFile(res, 'tables.html')
//             break
//         default:
//             res.sendFile(res, '404.html')
//             break
//     }
// })

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays all reservations
app.get("/api/reservations", function(req, res) {
    return res.json(reservations);
});

// Displays a single character, or returns false
app.get("/api/reservations/:character", function(req, res) {
    var chosen = req.params.character;

    console.log(chosen);

    for (var i = 0; i < reservations.length; i++) {
        if (chosen === reservations[i].routeName) {
            return res.json(reservations[i]);
        }
    }

    return res.json(false);
});

app.get('/api/:endpoint?', function(req, res) {
    switch (req.params.endpoint) {
        case 'tables':
            res.json(tables)
            break
        case 'waitlist':
            res.json(tables.slice(5))
            break
        default:
            res.status(404).json({ error: 'Not Found' })
            break
    }
})

app.post('/tables', function(req, res) {
    const table = req.body

    let response
    if (!isValid(table)) {
        res.status(400)
        response = { error: 'Malformed input. Check your submission and try again.' }
    } else {
        res.status(201)
        tables.push(table)
    }

    res.json(response)
})

// @Start
app.listen(PORT, function(err) {
    if (err) {
        return console.error(err)
    }

    console.log(`Listening on port ${PORT}.`)
})
