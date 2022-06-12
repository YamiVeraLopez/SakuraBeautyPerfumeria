import express from "express";

import { getCart, addToCart, emptyCart, deleteFromCart } from "../controllers/cartController";
import { userInSession } from "../middlewares/userInSession";

const router = express.Router();

//obtener carrito
router.get('/', userInSession, getCart);
//agregar producto al carrito de compras
router.post('/add/:id/:quantity', userInSession, addToCart);
//vaciar carrito
router.delete('/empty', userInSession, emptyCart);
//eliminar producto de carrito
router.delete('/remove/:id', userInSession, deleteFromCart);

export default router;