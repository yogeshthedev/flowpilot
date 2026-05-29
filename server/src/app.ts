import express, { Application, Request, Response } from "express";
import authRoutes from "./routes/auth.routes";
import cookies from "cookie-parser";
const app: Application = express();

// Middleware
app.use(express.json());
app.use(cookies());


//Routes
app.use("/api/auth", authRoutes);

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running with TypeScript and MongoDB!");
});

export default app;
