import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConfig.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();
const app = express();
connectDB();

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("nestNexus API is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on ports " + PORT);
});

app.use("/api/auth", authRouter);
