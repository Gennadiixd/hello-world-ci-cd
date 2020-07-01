import * as express from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";

const app = express();

app.use(cors())

import productsRoutes from "./components/products/products-api";

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/products", productsRoutes);
app.get("/", (req, res) => res.send("Hello World!"));

export default app;
