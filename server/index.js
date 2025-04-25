import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConfig.js";

dotenv.config();
const app = express();
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
