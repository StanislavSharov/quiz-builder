import express from "express";
import cors from "cors";
import quizRoutes from "./routes/quiz.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

export const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"]
  })
);

app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  return res.status(200).json({
    status: "ok",
    service: "quiz-builder-api"
  });
});

app.use("/api/quizzes", quizRoutes);

app.use((_req, res) => {
  return res.status(404).json({
    message: "Route not found."
  });
});

app.use(errorMiddleware);