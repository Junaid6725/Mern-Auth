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

const allowOrigins = [
  process.env.FRONTEND_URL || "https://mern-auth-five-black.vercel.app",
];

app.use(express.json());
app.use(cors({ origin: allowOrigins, credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.options(
  "*",
  cors({
    origin: allowOrigins,
    credentials: true,
  }),
);
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
