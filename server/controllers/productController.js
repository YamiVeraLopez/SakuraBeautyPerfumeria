import Product from "../models/Product";
import SubCategory from "../models/SubCategorie";
import Category from "../models/Categorie";


//traer todos los productos
export const getAllProducts = async(req, res, next) => {
    let products;

    try {
        products = await Product.find();
        
    } catch (err) {
        console.log(err);
    }

    if(!products){
        return res.status(404).json({message: 'No Products Found'});
    }

    return res.status(200).json({products});
}

//traer producto por id
export const getProductById = async(req, res, next) => {
    const id = req.params.id;
    let product;

    try {
        product = await Product.findById(id);
    } catch (err) {
        console.log(err);
    }

    if(!product){
        return res.status(404).json({message: 'No Product Found'});
    }

    return res.status(200).json({product});
}

//crear producto
export const addProduct = async(req, res, next) => {
    const {name, mainFeatures, price, discount, barcode, stock, description, colors, size, outstanding} = req.body;
    
    let existingProduct;
    try {
        existingProduct = await Product.findOne({name});
    } catch (err) {
       return console.log(err);
    }

    if(existingProduct){
        return res.status(400).json({message: 'Product Already Exists!'});
    }

    const product = new Product({
        name,
        mainFeatures,
        price,
        discount,
        barcode,
        stock,
        description,
        colors,
        size,
        outstanding
    });

    try {
        await product.save();
    } catch (err) {
       return console.log(err);
    }
    return res.status(201).json({product});
}

//eliiminar producto por id
export const deleteProduct = async(req, res, next) => {
    const id = req.params.id;
    let product;

    try {
        product = await Product.findById(id);
    } catch (err) {
        console.log(err);
    }

    if(!product){
        return res.status(404).json({message: 'No Product Found'});
    }

    try {
        await product.remove();
    } catch (err) {
        console.log(err);
    }

    return res.status(200).json({message: 'Product Deleted'});
}

//actualizar producto por id
export const updateProductById = async(req, res, next) => {
    const id = req.params.id;
    const { name, mainFeatures, price, discount, barcode, stock, description, colors, size, outstanding
} = req.body;
    let product;

    try {
        product = await Product.findByIdAndUpdate(id, {
            name,
            mainFeatures,
            price,
            discount,
            barcode,
            stock,
            description,
            colors,
            size,
            outstanding
        });
    } catch (err) {
        console.log(err);
    }

    if(!product){
        return res.status(404).json({message: 'No Product Found'});
    }

    return res.status(200).json({message: 'Product Updated'});
}

//buscador de productos
export const searchProducts = async(req, res, next) => {
    const {search} = req.params;
    let products;

    try {
        products = await Product.find({name: {$regex: search, $options: 'i'}});
    } catch (err) {
        console.log(err);
    }

    if(!products){
        return res.status(404).json({message: 'No Products Found'});
    }

    return res.status(200).json({products});
}

//buscar productos por filtros
export const searchProductsByFilters = async(req, res, next) => {
    const {search, color, minPrice, maxPrice, category, subCategory, mark, size, orderBy, asc_des} = req.params;
    let products;
    let filters = {};

    if(minPrice){
        filters = {
            price: {
                $gte: minPrice,
            }
        }
    }

    if(maxPrice){
        filters = {
            price: {
                $lte: maxPrice,
            }
        }
    }

    if(color){
        filters = {
            colors: color
        }
    }

    if(search){
        filters = {
            name: {
                $regex: search,
                $options: 'i'
            }
        }
    }

    if(category){
        filters = {
            categorie: category
        }
    }

    if(subCategory){
        filters = {
            subCategorie: subCategory
        }
    }

    if(mark){
        filters = {
            mark: mark
        }
    }

    if(size){
        filters = {
            size: size
        }
    }

    try {
        products = await Product.find({filters});
    } catch (err) {
        console.log(err);
    }

    //orderBy
    if(orderBy === 'price'){
        //order ascending
        if(asc_des === 'asc'){
            products.sort((a, b) => a.price - b.price);
        }
        //order descending
        else{
            products.sort((a, b) => b.price - a.price);
        }
    }

    if(orderBy === 'discount'){
        //oreder ascendent
        if(asc_des === 'asc'){
            products.sort((a, b) => {
                return a.discount - b.discount;
            });
        }
        //order descendent
        else{
            products.sort((a, b) => {
                return b.discount - a.discount;
            });
        }
    }

    if(orderBy === 'name'){
        //order ascending
        if(asc_des === 'asc'){
            products.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
        }
        //order descending
        else{
            products.sort((a, b) => {
                return b.name.localeCompare(a.name);
            });
        }
    }

    if(orderBy === 'stock'){
        //order ascendent
        if(asc_des === 'asc'){
            products.sort((a, b) => {
                return a.stock - b.stock;
            });
        }
        //order descendent
        else{
            products.sort((a, b) => {
                return b.stock - a.stock;
            });
        }
    }

    
    if(!products){
        return res.status(404).json({message: 'No Products Found'});
    }

    return res.status(200).json({products});
}