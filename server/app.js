require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser"); //<-- Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const morgan = require("morgan"); //<-- HTTP request logger middleware for node.js

const app = express();

const port = process.env.PORT || 8080;

//Database connection
require("./db");

app.use(morgan("combined"));
app.use(bodyParser.json());

require("./routes")(app);

app.listen(port, () => {
    console.log("Server running at port: " + port);
});