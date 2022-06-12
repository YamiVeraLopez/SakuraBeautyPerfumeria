import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import favoriteRoutes from "./routes/favoritesRoutes";
import cartRoutes from "./routes/cartRoutes";
import adminRoutes from "./routes/adminRoutes";
import cors from "cors";

import { config } from './config.js';
const app = express();

//middlewares
//cors para permitir peticiones de otros dominios
app.use(cors());

app.use(express.json());

app.use(cookieParser());
app.use(session({
	secret: 'sakuraBeauty',
	resave: false,
	saveUninitialized: true,
}));

app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/admin', adminRoutes);

mongoose.connect(
	`${config.DB_CONECT}`
).then(() => app.listen(config.PORT)).then(() => console.log(`Connected To Database and Listenig To port ${config.PORT}`)).catch((err) => console.log(err));