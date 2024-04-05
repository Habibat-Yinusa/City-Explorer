import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import * as dotenv from "dotenv"
import mongoose from 'mongoose'
import { connectDB } from "./config/db"
import userRoutes from "./routes/userRoutes";


dotenv.config();
connectDB();

const app = express();
const port = 3000;

app.use(cors({
  credentials: true,
}));


//middlewares
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

//end-points
app.use("/api/user", userRoutes)


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

