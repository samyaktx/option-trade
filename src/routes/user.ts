import express from "express";
import { Request, Response } from "express";
import { INR_BALANCES } from "../db";

export const userRouter = express.Router();

userRouter.get("/inr/create/:userId", (req : Request, res : Response) => {
  const { userId } = req.params;
  if (!userId) {
    res.status(400).json({ error: "User ID is required" });
  }

  if(!INR_BALANCES[userId]) {
    INR_BALANCES[userId] = {
      balance: 0, 
      locked: 0
    };
  }
  res.status(201).json({ 
    message: `The account for user has been created successfully`,
    userId,
    balance: INR_BALANCES[userId].balance
  });
});

