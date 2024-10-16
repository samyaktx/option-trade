import express from "express";
import { Request, Response } from "express";
import { INR_BALANCES, STOCK_BALANCES } from "../db";

export const balanceRouter = express.Router();

balanceRouter.get("/inr", (req: Request, res: Response) => {
    res.status(200).json({ inr_balance: INR_BALANCES });
})

balanceRouter.get("/stock", (req: Request, res: Response) => {
    res.status(200).json({ stock_balance: STOCK_BALANCES });
})

// @TODO: - Endpoint : `/reset`   - Method : `POST` - Description: resets the in-memory `ORDERBOOK` , `INR_BALANCES` , `STOCK_BALANCES` back to {}

balanceRouter.get("/inr/:userId", (req: Request, res: Response) => {
  const userId  = req.params.userId;

  if (!userId) {
    res.status(404).json({ error: "User ID is required" });
  }
  if (!INR_BALANCES[userId]) {
    res.status(404).json({ error:  "User Balance not found" });
  }

  res.status(200).json({ 
    user_balance: INR_BALANCES[userId] 
  });
});

balanceRouter.get("/stock/:userId", (req: Request, res: Response) => {
    const userId = req.params.userId;
    const stockSymbol = req.params.stockSymbol;

    if (!userId) {
        res.status(404).json({ error: "User ID is required" });
    }

    if (!STOCK_BALANCES[userId]) {
        res.status(404).json({ error: "This User doesn't exits have Stock"});
    }

    if (STOCK_BALANCES[userId][stockSymbol].yes) {
      res.status(200).json({
        yesStockBalance: STOCK_BALANCES[userId][stockSymbol].yes.quantity,
      });
    }

    if (STOCK_BALANCES[userId][stockSymbol].no) {
      res.status(200).json({
        noStockBalance: STOCK_BALANCES[userId][stockSymbol].no.quantity,
      });
    }
});