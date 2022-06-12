import express from "express";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProductById, searchProductsByFilters, searchProducts } from "../controllers/productController";


const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/addProduct', addProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProductById);
router.get('/filter', searchProductsByFilters);
router.get('/search/:name', searchProducts);

export default router;