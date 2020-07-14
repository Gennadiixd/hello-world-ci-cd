import * as swaggerDocument from "./swagger.json";
import swaggerUi from "swagger-ui-express";

import express = require("express");
import morgan = require("morgan");
import bodyParser = require("body-parser");
import cookieParser = require("cookie-parser");
import cors = require("cors");

const app = express();

app.use(cors());

import productsRoutes from "./components/products/products-api";

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/products", productsRoutes);
app.get("/", (req, res) => res.send("Hello World!"));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
