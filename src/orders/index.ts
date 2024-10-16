import express from "express";
import { Request, Response } from "express";

import { buyYes, sellYes, buyNo, sellNo } from "./orders";

export const orderRouter = express.Router();

orderRouter.post("/buy/yes", buyYes);
orderRouter.post("/sell/yes", sellYes);
orderRouter.post("/buy/no", buyNo);
orderRouter.post("/sell/no", sellNo);



































// router.post("/order/yes", (req, res) => {
//   const { userId, stockSymbol, quantity, price } = req.body;

//   if (!userId) {
//     res.status(400).json({ error: "User ID is required" });
//   }

//   if (!stockSymbol) {
//     res.status(400).json({ error: "Stock symbol is required" });
//   }

//   if (!quantity) {
//     res.status(400).json({ error: "Quantity is required" });
//   }

//   if (!price) {
//     res.status(400).json({ error: "Price is required" });
//   }

//   // @Todo: Check if the user has enough balance to place the order
//   let priceNum = parseInt(price);
//   if (INR_BALANCES[userId].balance <= priceNum) {
//     res.status(400).json({ error: "Insufficient Balance" });
//   }
//   // @Todo: Check if the stock is available to buy
//   // @Todo: Deduct the amount from the user's balance
//   // @Todo: Update the stock balances

//   // @Todo: Update the order book
//   let NewOrderBook: any = {};
//   for (const pricex in ORDERBOOK) {
//     if (ORDERBOOK[stockSymbol].yes[pricex] == price) {
//       let totalOrders = ORDERBOOK[stockSymbol].yes[pricex].total + quantity;
//       console.log(totalOrders);
//       NewOrderBook.push(ORDERBOOK[stockSymbol].yes[pricex].orders[userId]);
//       NewOrderBook.push(totalOrders);
//       console.log(NewOrderBook);
//     } else {
//       NewOrderBook.push(ORDERBOOK[stockSymbol].yes[pricex].orders[userId]);
//       NewOrderBook.push(ORDERBOOK[stockSymbol].yes[pricex].total);
//     }
//   }

//   res.status(200).json({
//     message: "Order placed successfully",
//     // orderBook: NewOrder,
//     // stockBalanceLocked: NewStockBalanceLocked,
//     // stockBalanceQuantity: NewStockBalanceQuantity
//   });
// });

// export default router;
