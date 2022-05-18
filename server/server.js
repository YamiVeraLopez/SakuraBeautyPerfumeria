import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import {config} from './config.js';
const app = express();

app.use(express.json());
app.use('/api/user', userRoutes)

mongoose.connect(
    `${config.DB_CONECT}`
    ).then(() => app.listen(config.PORT)).then(() => console.log(`Connected To Database and Listenig To port ${config.PORT}`)).catch((err) => console.log(err));