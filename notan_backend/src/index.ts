import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import * as path from "path";
import compression from "compression";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import router from "./router";

dotenv.config();

const PORT: number = 8080;
const MONGO_URL: string | undefined = process.env.DB;

const app = express();

app.use(
  cors({
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    origin: ["http://localhost:5173"],
    allowedHeaders: "Content-Type",
  })
);
app.use(compression());

app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("Server running on Port " + PORT);
});

mongoose.Promise = Promise;

if (MONGO_URL) {
  mongoose.connect(MONGO_URL).then(() => {
    console.log("Database connection established!");
  });
  mongoose.connection.on("error", (error: Error) => console.log(error));
  app.use("/", router());
}
