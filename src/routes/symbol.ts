import express from "express";
import { Request, Response } from "express";
import { ORDERBOOK } from "../db";

export const symbolRouter = express.Router();

symbolRouter.post("/create/:stockSymbol", (req : Request, res : Response) => {
    const { stockSymbol }  = req.params;

    if (!stockSymbol) {
      res.status(400).json({ error: "Symbol required" });
    }
    
    if (ORDERBOOK[stockSymbol]) {
      res.status(400).json({ error: "Symbol is already taken" });
    }

    if (!ORDERBOOK[stockSymbol]) {
      ORDERBOOK[stockSymbol] = {
        yes: {},
        no: {},
      };
    }

    res.status(201).json({
      message: `Stock symbol ${stockSymbol} created successfully`,
      balance: ORDERBOOK[stockSymbol],
    });
})