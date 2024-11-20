import express, { Express, Request, Response} from "express";
import cors from "cors";
import { loadEnv } from "./configs/envs";
import { connectDB, disconnectDB } from "./configs/database";
import rideRouter from "./routers/ride-router";
import customerRouter from "./routers/customer-router";
import { handleApplicationErrors } from "./middlewares/error-handling-middleware";

loadEnv()

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use("/customer", customerRouter);
app.use("/ride", rideRouter);
app.get("/test", (_req: Request, res: Response) => {
    res.send('hello worldsssssssssssss');
});

app.use(handleApplicationErrors);

export function init(): Promise<Express> {
    connectDB();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
    await disconnectDB();
}

export default app;