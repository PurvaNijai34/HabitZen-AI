import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.js";
import habitRoutes from "./routes/habits.js";
import logRoutes from "./routes/logs.js";
import aiRoutes from "./routes/ai.js";

import {
  notFound,
  errorHandler,
} from "./middleware/errorHandler.js";

const app = express();

const allowedOrigins = (
  process.env.CLIENT_URL || ""
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, cb) {
    // Allow requests with no origin
    if (!origin) return cb(null, true);

    // Allow localhost in development
    if (
      /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(
        origin
      )
    ) {
      return cb(null, true);
    }

    // Allow CLIENT_URL origins
    if (allowedOrigins.includes(origin)) {
      return cb(null, true);
    }

    return cb(
      new Error(
        `Origin ${origin} not allowed by CORS`
      )
    );
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ],
};

// Middleware

app.use(cors(corsOptions));

app.use(express.json({ limit: "1mb" }));

app.use(cookieParser());

// Health route

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
  });
});

// Routes

app.use("/api/auth", authRoutes);

app.use("/api/habits", habitRoutes);

app.use("/api/logs", logRoutes);

app.use("/api/ai", aiRoutes);

// Error handlers

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

// Start server

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    });
  })
  .catch((err) => {
    console.error(
      "Failed to connect to MongoDB:",
      err.message
    );

    process.exit(1);
  });