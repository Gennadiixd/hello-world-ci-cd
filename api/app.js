const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const productsRoutes = require("./components/products");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/products", productsRoutes);
app.get("/", (req, res) => res.send("Hello World!"));

module.exports = { app };
