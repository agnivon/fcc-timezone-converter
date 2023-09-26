import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors({optionsSuccessStatus: 200})); 

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/api", (req: Request, res: Response) => {
  const date = new Date();
  return res.json({ unix: date.valueOf(), utc: date.toUTCString() });
});

app.get("/api/:time", (req: Request, res: Response) => {
  const date = new Date(Number(req.params.time) || req.params.time);
  if (isNaN(date.valueOf())) return res.json({ error: "Invalid Date" });
  return res.json({ unix: date.valueOf(), utc: date.toUTCString() });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
