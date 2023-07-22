import express, { Application, Request, Response, NextFunction } from "express";
import { router as userRoutes } from "./user/routes/user.routes";
import dotenv from "dotenv";
import fs from "fs";
import passport from "passport";
import "./config/passport";

// checking if .env file is available
if (fs.existsSync(".env")) {
  dotenv.config({ path: ".env" });
} else {
  console.error(".env file not found.");
  process.exit(1);
}

const app: Application = express();

app.use(express.json());
app.use(passport.initialize());

// Routes
app.use("/users", userRoutes);

app.use("/", (req: Request, res: Response, next: NextFunction): void => {
  res.json({ message: "Allo! Catch-all route." });
});

export default app;
