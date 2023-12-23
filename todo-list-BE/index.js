import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { router } from "./routes/routes.js";
import { userRoutes } from "./routes/userRoutes.js";
import { todoRoutes } from "./routes/todoRoutes.js";

import path from "path";
import cors from "cors";
dotenv.config();
const PORT = process.env.PORT || 4000;
const mongoString = process.env.DATABASE_URL;
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(`/api`, router);
app.use(express.static("uploads"));
app.use(`/file`, express.static("uploads"));
app.use(`/user`, userRoutes);
app.use(`/todo`, todoRoutes);

mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
