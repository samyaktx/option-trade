import express from "express";
import { Request, Response, NextFunction } from "express";
import { INR_BALANCES, ORDERBOOK } from "../db";

const strToInt = (price: string): number => {
    return parseInt(price);
}

const intToStr = (price: number): string => {
    return price.toString();
}

const checkInrBalance = (req: Request, res: Response, next: NextFunction) => {
  const { userId, quantity, price } = req.body;

  if (INR_BALANCES[userId]["balance"] < price * strToInt(quantity)) {
    res.status(403).json({ error: "Insufficient balance" });
  }

  return next();
};


// Buy YES stock
export const buyYes = express.Router();

buyYes.post("/", checkInrBalance, (req: Request, res: Response) => {
  const { userId, stockSymbol, price, quantity } = req.body;

  if (!ORDERBOOK[stockSymbol]) {
    res.status(404).json({ error: "Stock symbol not found" });
  }

  // Orderbook : if user bids to buy `Yes stock` for $X -> place order in `No stock` for $(10 - X)

  const noPrice = (10 - strToInt(price)).toString();
  console.log(`quantity type : ${quantity}`);

  const quantityBuy = strToInt(quantity);
  console.log(`quantity type : ${quantityBuy}`);

  if (ORDERBOOK[stockSymbol].no[noPrice]) {
    if (ORDERBOOK[stockSymbol].no[noPrice].orders[userId]) {
      ORDERBOOK[stockSymbol].no[noPrice].orders[userId] += quantityBuy;
    } else {
      ORDERBOOK[stockSymbol].no[noPrice].orders[userId] = quantityBuy;
    }
    ORDERBOOK[stockSymbol].no[noPrice].total += quantityBuy;
  } else {
    ORDERBOOK[stockSymbol].no[noPrice] = {
      total: quantityBuy,
      orders: {
        [userId]: quantityBuy,
      },
    };
  }

  // Updating INR_BALANCE
  const totalCost = quantityBuy * price;
  INR_BALANCES[userId].balance -= totalCost;
  INR_BALANCES[userId].locked += totalCost;

  // @TODO Update STOCK_BALANCE
  // @TODO Update after matching the order

  // After order match
  res.status(201).send({ orderbook: ORDERBOOK[stockSymbol] });
});


// Buy NO Stock
export const buyNo = express.Router();

buyNo.post("/", checkInrBalance, (req: Request, res: Response) => {
    const { userId, stockSymbol, price, quantity } = req.body;

    if (!ORDERBOOK[stockSymbol]) {
      res.status(404).json({ error: "Stock symbol not found" });
    }

    // Orderbook : if user bids to buy `Yes stock` for $X -> place order in `No stock` for $(10 - X)

    const yesPrice = (10 - strToInt(price)).toString();
    console.log(`quantity type : ${quantity}`);

    const quantityBuy = strToInt(quantity);
    console.log(`quantity type : ${quantityBuy}`);

    if (ORDERBOOK[stockSymbol].yes[yesPrice]) {
      if (ORDERBOOK[stockSymbol].yes[yesPrice].orders[userId]) {
        ORDERBOOK[stockSymbol].yes[yesPrice].orders[userId] += quantityBuy;
      } else {
        ORDERBOOK[stockSymbol].yes[yesPrice].orders[userId] = quantityBuy;
      }
      ORDERBOOK[stockSymbol].yes[yesPrice].total += quantityBuy;
    } else {
      ORDERBOOK[stockSymbol].yes[yesPrice] = {
        total: quantityBuy,
        orders: {
          [userId]: quantityBuy,
        },
      };
    }

    // Updating INR_BALANCE
    const totalCost = quantityBuy * price;
    INR_BALANCES[userId].balance -= totalCost;
    INR_BALANCES[userId].locked += totalCost;

    // @TODO Update STOCK_BALANCE

    // After order match
    res.status(201).send({ orderbook: ORDERBOOK[stockSymbol] });
  }
);

// Sell YES Stock
export const sellYes = express.Router();

sellYes.post("/", (req: Request, res: Response) => {
  const { userId, stockSymbol, price, quantity } = req.body;

  const sellQuantity = strToInt(quantity);

  if (ORDERBOOK[stockSymbol].yes.hasOwnProperty(price)) {
    if (ORDERBOOK[stockSymbol].yes[price].orders.hasOwnProperty(userId)) {
      ORDERBOOK[stockSymbol].yes[price].orders[userId] += sellQuantity;
    } else {
      ORDERBOOK[stockSymbol].yes[price].orders[userId] = sellQuantity;
    }
    ORDERBOOK[stockSymbol].yes[price].total += sellQuantity;
  } else {
    ORDERBOOK[stockSymbol].yes[price] = {
      total: sellQuantity,
      orders: {
        [userId]: sellQuantity,
      },
    };
  }
  // @TODO INR Balance update
  // @TODO Update after matching the order

  // @TODO Stock Balance update

  // After order match
  res.status(201).send({ orderbook: ORDERBOOK[stockSymbol] });
});


// Sell NO Stock
export const sellNo = express.Router();

sellNo.post("/", (req: Request, res: Response) => {
  const { userId, stockSymbol, quantity, price } = req.body;

  const sellQuantity = strToInt(quantity);

  if (ORDERBOOK[stockSymbol].no.hasOwnProperty(price)) {
    if (ORDERBOOK[stockSymbol].no[price].orders.hasOwnProperty(userId)) {
      ORDERBOOK[stockSymbol].no[price].orders[userId] += sellQuantity;
    } else {
      ORDERBOOK[stockSymbol].no[price].orders[userId] = sellQuantity;
    }
    ORDERBOOK[stockSymbol].no[price].total += sellQuantity;
  } else {
    ORDERBOOK[stockSymbol].no[price] = {
      total: sellQuantity,
      orders: {
        [userId]: sellQuantity,
      },
    };
  }
  // @TODO INR Balance update
  // @TODO Update after matching the order

  // @TODO Stock Balance update

  // After order match
  res.status(201).send({ orderbook: ORDERBOOK[stockSymbol] });
})

































// function buyYesStock(userId: string, stockSymbol: string, quantity: number, price: number) {

//     for (const pricex in ORDERBOOK[stockSymbol].yes) {
//         let priceLevel: number = parseInt(pricex);  
//         if (priceLevel === price) {
//             ORDERBOOK[stockSymbol].yes[price].total += quantity;
//             let users = ORDERBOOK[stockSymbol].yes[price].orders;
//             for (const user in users) {
//                 if(user === userId) {
//                     let user_stocks: number = parseInt(userId);
//                     user_stocks += quantity;
//                     // ORDERBOOK.
//                 }
//             }
//         }
//     }
// }
