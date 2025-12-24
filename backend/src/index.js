import express from "express";
import cors from "cors";
import generateRoute from "./routes/generate.js";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/generate", generateRoute);

app.listen(3000, () => {
  console.log("http://localhost:3000")
});