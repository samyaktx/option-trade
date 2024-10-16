import express from "express";
import { Request, Response } from "express";
import { ORDERBOOK } from "../db";

export const orderBookRouter = express.Router();

orderBookRouter.get("/", (req: Request, res: Response) => {
    res.status(201).json({ orderbook: ORDERBOOK})
})

orderBookRouter.get("/:stockSymbol", (req: Request, res: Response) => {
    const stockSymbol = req.params.stockSymbol;

    if(!ORDERBOOK[stockSymbol]) {
        res.status(403).json({ error: `${stockSymbol} doesn't exists in orderbook`});
    }

    res.status(201).json({ orderbook: ORDERBOOK[stockSymbol]});
})