//Fast, unopinionated, minimalist web framework for node.
const express = require("express");
//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const bodyParser = require("body-parser");
//HTTP request logger middleware for node.js
const morgan = require("morgan");

const app = express();

const port = process.env.PORT || 8080;

app.use(express.static("dist"));

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
    Quote.find({}, "text author", (error, quotes) => {
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

//FETCH SINGLE
app.get("/api/quote/:id", (req, res) => {
    Quote.findById(req.params.id, "text author", (error, quote) => {
        if (error) {
            console.log("Error: ", error);
            res.status(500).send({
                success: false,
                message: "Unable to fetch quote."
            });
            return;
        }
        res.send(quote);
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

    newQuote.save(err => {
        if (err) {
            console.log("Error: ", err);
        }

        res.send({
            success: true,
            message: "Quote created!"
        });
    });
});

//UPDATE
app.put("/api/quotes/:id", (req, res) => {
    Quote.findById(req.params.id, "text author", (error, quote) => {
        if (error)
            console.log("Error updating quote:", error);

        quote.text = req.body.text;
        quote.author = req.body.author;
        quote.save(err => {
            if (err)
                console.log("Error:", err);

            res.send({
                success: true
            });
        });
    });
});

//DELETE
app.delete("/api/quotes/:id", (req, res) => {
    Quote.remove({
        _id: req.params.id
    }, err => {
        if (err)
            res.send(err);
        res.send({
            success: true
        });
    });
});