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
import usersRoutes from "./components/users/users-api";
import sessionRoutes from "./components/session/session-api";

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/products", productsRoutes);
app.use("/user", usersRoutes);
app.use("/session", sessionRoutes);

export default app;
