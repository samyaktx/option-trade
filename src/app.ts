import express from "express";
import cors from "cors";

import { userRouter } from "./routes/user";
import { symbolRouter } from "./routes/symbol";
import { orderBookRouter } from "./routes/orderbook";
import { balanceRouter } from "./routes/balance";
import { onrampRouter } from "./routes/onramp";
import { orderRouter } from "./order";

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Probo Option Trading App");
})

app.use("/api/v1/user", userRouter);
app.use("/api/v1/symbol", symbolRouter);
app.use("/api/v1/orderbook", orderBookRouter);
app.use("/api/v1/balance", balanceRouter);
app.use("/api/v1/onramp", onrampRouter);
app.use("/api/v1/order", orderRouter);

export default app;