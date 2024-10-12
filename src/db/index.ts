interface UserBalance {
  balance: number;
  locked: number;
}

interface InrBalances { 
  [userId: string]: UserBalance;
}

export const INR_BALANCES: InrBalances = {
  user1: {
    balance: 10,
    locked: 0,
  },
  user2: {
    balance: 20,
    locked: 10,
  },
};


interface Orders {
  [userId: string]: number;
}

interface PriceLevel {
  total: number;
  orders: Orders;
}

interface Outcome {
  [price: string]: PriceLevel;
}

interface Contract {
  yes: Outcome;
  no: Outcome;
}

interface OrderBook {
  [contractId: string]: Contract;
}

export const ORDERBOOK: OrderBook = {
  BTC_USDT_10_Oct_2024_9_30: {
    yes: {
      "9.5": {
        total: 12,
        orders: {
          user1: 2,
          user2: 10,
        },
      },
      "8.5": {
        total: 12,
        orders: {
          user1: 3,
          user2: 3,
          user3: 6,
        },
      },
    },
    no: {},
  },
};


interface StockPosition {
  quantity: number;
  locked: number;
}

interface StockOutcome {
  yes?: StockPosition;
  no?: StockPosition;
}

interface UserStockBalances {
  [contractId: string]: StockOutcome;
}

interface StockBalances {
  [userId: string]: UserStockBalances;
}

export const STOCK_BALANCES: StockBalances = {
  user1: {
    BTC_USDT_10_Oct_2024_9_30: {
      yes: {
        quantity: 1,
        locked: 0,
      },
    },
  },
  user2: {
    BTC_USDT_10_Oct_2024_9_30: {
      no: {
        quantity: 3,
        locked: 4,
      },
    },
  },
};
