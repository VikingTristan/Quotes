const serveStatic = require("serve-static");
const history = require("connect-history-api-fallback"); // <-- Middleware to proxy requests through a specified index page, useful for Single Page Applications that utilise the HTML5 History API.

const isDev = process.env.NODE_ENV !== "production";

//Get Quote model
const Quote = require("./models/quote");

module.exports = function (app) {

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

    //FETCH ONE RANDOM
    app.get("/api/random", (req, res) => {
        // Get the count of all quotes
        Quote.count().exec(function (error, count) {

            if (error) {
                console.log("Error: ", error);
                res.status(500).send({
                    success: false,
                    message: "Unable to fetch a random quote."
                });
                return;
            }

            // Get a random entry
            const random = Math.floor(Math.random() * count);

            // Again query all quotes but only fetch one offset by our random numberino
            Quote.findOne({}, "text author").skip(random).exec(
                function (error, quote) {
                    if (error) {
                        console.log("Error: ", error);
                        res.status(500).send({
                            success: false,
                            message: "Unable to fetch a random quote."
                        });
                        return;
                    }
                    res.send(quote);
                });
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

    app.use(history({
        verbose: true
    }));
    if (isDev) {
        //TODO We wanna serve the development vue stuff here... how?
        app.use("/", serveStatic("dist"));
    } else {
        //If production serve dist files...
        app.use("/", serveStatic("dist"));
    }
};