import dotenv from "dotenv";
import { startServer } from "./infrastructure/api/config/server";

dotenv.config();
const port: number = Number(process.env.PORT) || 3000;

startServer(port);
