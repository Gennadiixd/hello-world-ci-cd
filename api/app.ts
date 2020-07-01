import * as express from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";

const app = express();

import productsRoutes from "./components/products/products-api";
// const productsRoutes = require("./components/products");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/products", productsRoutes);
app.get("/", (req, res) => res.send("Hello World!"));

export default app;
