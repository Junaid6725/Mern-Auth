import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongoDB.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("<h1>API Working</h1>");
});
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}:`);
});
