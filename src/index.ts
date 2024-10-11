import express, { json } from "express";
import cors from "cors";
import balanceRouter from "./balance";

const app = express();

app.use(cors());
app.use(json());

app.use("/balance", balanceRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});