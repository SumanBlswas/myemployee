import express from "express";
import { connection } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import { userRouter } from "./routes/userRoutes.js";
import { empRouter } from "./routes/empRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Welcome Home");
});

app.use("/user", userRouter);
app.use("/employee", empRouter);

app.listen(1800, async () => {
  try {
    await connection;
    console.log("Connected to the db");
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running at 1800`);
});
