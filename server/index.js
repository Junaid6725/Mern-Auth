import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongoDB.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config();
// const PORT = process.env.PORT || 8000;
connectDB();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("<h1>API Working</h1>");
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}:`);
// });

export default app;
