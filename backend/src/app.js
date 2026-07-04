import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://career-pilot-ai-drab.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      const isVercelPreview =
        origin &&
        /^https:\/\/career-pilot-.*-vaibhav-mahajans-projects-.*\.vercel\.app$/.test(
          origin
        );

      if (!origin || allowedOrigins.includes(origin) || isVercelPreview) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CareerPilot AI API is running",
  });
});

export default app;