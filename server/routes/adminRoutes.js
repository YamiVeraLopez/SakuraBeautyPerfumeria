import express from "express";

import {getAllUser, getAllCategory, getAllMark, getAllProduct, getAllSubCategory, getAllRol, createCategory, createMark, createProduct, createRol, createSubCategory, createUser, updateProduct, updateRol, updateCategory, updateSubCategory, updateMark, getUsersByName, exportProducts, exportItems}  from "../controllers/adminController";
import { updateUser } from "../controllers/userController";
import { isAdmin } from "../middlewares/isAdmin";

const router = express.Router();

//traer todos los productos
router.get('/products', getAllProduct);
//traer todas las categorias
router.get('/categories', getAllCategory);
//traer todas las subcategorias
router.get('/subcategories', getAllSubCategory);
//traer todas las marcas
router.get('/marks', getAllMark);
//traer todos los usuarios
router.get('/users', getAllUser);
//traer todos los roles
router.get('/roles', getAllRol);

//crear un nuevo producto
router.post('/products', isAdmin, createProduct);
//crear un nuevo usuario
router.post('/users', isAdmin,createUser);
//crear un nuevo rol
router.post('/roles', isAdmin, createRol);
//crear une nueva categoria
router.post('/categories', isAdmin, createCategory);
//crear una nueva subcategoria
router.post('/subcategories', isAdmin, createSubCategory);
//crear una nueva marca
router.post('/marks', isAdmin, createMark);

//actualizar un producto
router.put('/products/:id', updateProduct);
//actualizar un usuario
router.put('/users/:id', updateUser);
//actualizar un rol
router.put('/roles/:id', updateRol);
//actualizar una categoria
router.put('/categories/:id', updateCategory);
//actualizar una subcategoria
router.put('/subcategories/:id', updateSubCategory);
//actualizar una marca
router.put('/marks/:id', updateMark);

router.get('/user/:name', getUsersByName);

//exportar listado de productos
router.get('/exportProducts', exportProducts);
//exportar listado de items
router.get('/exportItems', exportItems);


export default router;