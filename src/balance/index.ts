import express from "express";

import { INR_BALANCES, STOCK_BALANCES } from "../db";

const router = express.Router();

router.get("/inr/create/:userId", (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    res.status(400).json({ error: "User ID is required" });
  }

  INR_BALANCES[userId].balance = 0;
  res.status(201).json({ 
    message: `The account for user ${userId} has been created successfully`,
    balance: INR_BALANCES[userId].balance
  });
});


router.get("/stock/create/:userId/:stockSymbol", (req, res) => {
  const { userId, stockSymbol } = req.params;

  if (!userId) {
    res.status(400).json({ error: "User ID is required" });
  } 

  if (!stockSymbol) {
    res.status(400).json({ error: "Stock symbol is required" });
  }

  STOCK_BALANCES[userId][stockSymbol] = { 
    yes: { 
      quantity: 0, 
      locked: 0 
    }, 
    no: { 
      quantity: 0, 
      locked: 0 
    } 
  };

  res.status(201).json({ 
    message: `Stock symbol ${stockSymbol} created successfully for user ${userId}`,
    balance: STOCK_BALANCES[userId][stockSymbol]
  });

});


router.get("/inr/:userId", (req, res) => {
  const { userId } = req.params;
  
  if (!userId) {
    res.status(400).json({ error: "User ID is required" })
  }

  res.json(INR_BALANCES[userId]);
});


router.post("/onramp/inr", (req, res) => {
  const { userId, amount } = req.body;

  if (!userId) {
    res.status(400).json({ error: "User ID is required" });
  } 

  if (!amount) {
    res.status(400).json({ error: "Amount is required" });
  } 

  INR_BALANCES[userId].balance += amount;

  res.status(200).json({ 
    message: `INR onramped successfully for user ${userId} and balance is ${INR_BALANCES[userId].balance}`,
    userId,
    balance: INR_BALANCES[userId].balance
  });

});


export default router;
