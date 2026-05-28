
import express, { Application, Request, Response } from "express";

const app: Application = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running with TypeScript and MongoDB!");
});

export default app;