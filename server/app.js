//Fast, unopinionated, minimalist web framework for node.
const express = require("express");
//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const bodyParser = require("body-parser");
//HTTP request logger middleware for node.js
const morgan = require("morgan");

const app = express();

const port = process.env.PORT || 8080;

app.use(express.static('dist'));

app.listen(port, () => {
    console.log("Server running at port: " + port);    
});

//Database connection
require("./db");

//Get Quote model
const Quote = require("./models/quote");

app.use(morgan("combined"));
app.use(bodyParser.json());

/****************
   Q U O T E S 
****************/
//FETCH ALL
app.get("/api", (req, res) => {
    Quote.find({}, "text author", function (error, quotes) {
        if (error) {
            console.error("Error: ", error);
        }
        res.send({
            quotes: quotes
        });
    }).sort({
        _id: -1
    });
});

//CREATE
app.post("/api/quotes", (req, res) => {
    const text = req.body.text;
    const author = req.body.author;

    const newQuote = new Quote({
        text: text,
        author: author
    });

    newQuote.save(function (e) {
        if (e) {
            console.log("Error: ", e);
        }

        res.send({
            success: true,
            message: "Quote created!"
        });
    });
});