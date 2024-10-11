- [x] **Get INR Balance**
    - Endpoint: `/balance/inr/:userId`
    - Method: `GET`
    - Description: Returns the INR balance of a given user.
  
- [ ] **Onramp INR**
    - Endpoint: `/onramp/inr`
    - Method: `POST`
    - Body: 
    ```json
    {
        "userId": "user1",
        "amount": 10000 // make sure amount is in paise and not Rs
    }
    ```
    - Description: Lets the user onramp INR on the platform

- [ ] **Get Stock Balance**
    - Endpoint: `/balance/stock/:userId`
    - Method: `GET`
    - Description: Returns the stock balance for a user.
  
- [ ]  **Buy the `yes` stock**
    - Endpoint: `/order/yes`
    - Method: `POST`
    - Description: Allows a user to place a buy order for options on a stock. The order will be added to the `ORDERBOOK`.
    - Input (example):
    ```json
    {
        "userId": "123",
        "stockSymbol": "BTC_USDT_10_Oct_2024_9_30",
        "quantity": 100,
        "price": 1000
    }
    ```

- [ ] **Place Sell Order**
    - Endpoint: `/order/no`
    - Method: `POST`
    - Description: Allows a user to place a sell order for options. This will also be added to the `ORDERBOOK`.
    - Input (example):
    ```json
    {
        "userId": "123",
        "stockSymbol": "ABC",
        "quantity": 100,
        "price": 1100
    }
    ```

- [ ] **View Orderbook**
    - Endpoint: `/orderbook/:stockSymbol`
    - Method: `GET`
    - Description: Returns the current buy and sell orders for a given stock.
  
- [ ] **Mint fresh tokens**
    - Endpont: `/trade/mint/:stockSymbol`
    - Method: `POST`
    - Input
    ```json
    {
        "userId": "123",
        "stockSymbol": "ABC",
        "quantity": 100,
    }
    ```
    
- [ ] **Assumptions:**
    - Orders should only be placed if users have sufficient balances.
    - You do not need to match or execute orders yet. The focus is on order placement and management in memory.

### Bonus Challenge (Optional):

- Implement a basic matching engine that pairs buy and sell orders if their prices meet. When an order is matched, update the balances accordingly.
- Add a websocket layer where user can subscribe to the orderbook for a market for depth updates 