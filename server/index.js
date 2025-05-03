import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConfig.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import listingRouter from "./routes/listing.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
console.log("Allowed origin:", process.env.ALLOWED_URL);
app.use(
  cors({
    origin: [`${process.env.ALLOWED_URL}`],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", async (req, res) => {
  res.send("nestNexus API is running right now!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on ports " + PORT);
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listing", listingRouter);

//middleware for handling errors
app.use((err, req, res, next) => {
  const staatusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(staatusCode).json({
    success: false,
    staatusCode,
    message,
  });
});
