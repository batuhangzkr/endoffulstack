import express from "express";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import mongoose from "mongoose";

import { authRouter, carRouter } from "./routes";

configDotenv();
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/auth", authRouter);
app.use("/car", carRouter);

mongoose
  .connect(process.env.MONGO_URI as any)
  .then(() => console.log("Mongo connect success"))
  .catch(() => console.log("Mongo connect error"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
