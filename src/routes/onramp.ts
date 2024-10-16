import express from "express";
import { Request, Response } from "express";
import { INR_BALANCES } from "../db";

export const onrampRouter = express.Router();

onrampRouter.post("/inr", (req: Request, res: Response) => {
    const { userId, amount } = req.body;

    if(!userId) {
        res.status(404).json({ error: "User ID is required" });
    }

    if (!amount) {
      res.status(400).json({ error: "Amount is required" });
    }

    INR_BALANCES[userId].balance += amount;

    res.status(200).json({
      message: `INR onramped successfully for ${userId} and balance is ${INR_BALANCES[userId].balance}`,
      userId,
      balance: INR_BALANCES[userId].balance,
    });
}) 
