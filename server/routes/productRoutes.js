import express from "express";
import { addProduct, deleteProduct, getAllProducts, getProductById, getProductsByPriceRange, searchProducts, updateProductById, getProductsByColor } from "../controllers/productController";


const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/addProduct', addProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProductById);
router.get('/price/:minPrice/:maxPrice', getProductsByPriceRange);
router.get('/search/:search', searchProducts);
router.get('/color/:color', getProductsByColor);
export default router;