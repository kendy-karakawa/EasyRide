import express, { Express, Request, Response} from "express";
import cors from "cors";
import { loadEnv } from "./configs/envs";
import { connectDB, disconnectDB } from "./configs/database";



loadEnv()

const app: Express = express();
app.use(cors());
app.use(express.json());
app.get("/test", (_req: Request, res: Response) => {
    res.send('hello world');
});

export function init(): Promise<Express> {
    connectDB();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
    await disconnectDB();
}


export default app;