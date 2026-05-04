import express from "express";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './lib/swagger.js';
import projectRoutes from "./routes/project.routes.js";
import authRoutes from "./routes/auth.routes.js";
import newsRoutes from "./routes/news.routes.js";
import publicRoutes from "./routes/public.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Swagger JSON for debugging
app.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

app.get('/', (req, res) => {
  res.json({
    message: "Welcome to the Neo Telemetri Profile API",
    version: "1.0.0",
    endpoints: {
      root: "/",
      public: "/api/public",
      marketing: "/api/marketing",
      pr: "/api/pr",
      auth: "/api/auth"
    }
  });
});

// Admin Routes with Role Prefix as per panduan
app.use("/api/marketing", projectRoutes);
app.use("/api/pr", newsRoutes);
app.use("/api/auth", authRoutes);

// Public Routes
app.use("/api/public", publicRoutes);

export default app;
