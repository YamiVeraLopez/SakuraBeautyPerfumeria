import express from "express";

import { addToFavorites, removeFromFavorites, emptyFavorites, getFavorites } from "../controllers/favoriteController";

const router = express.Router();

//obtener favoritos
router.get('/', getFavorites);
//agregar favoritos
router.get('/:id', addToFavorites);
//eliminar un favorito
router.get('/remove/:id', removeFromFavorites);
//vaciar favoritos
router.delete('/empty', emptyFavorites);

export default router;