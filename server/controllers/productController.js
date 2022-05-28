import Product from "../models/Product";

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
    const {name, mainFeatures, price, discount, barcode, stock, description, colors, size} = req.body;
    
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
        size
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
    const {name, mainFeatures, price, discount, barcode, stock, description, colors, size} = req.body;
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
            size
        });
    } catch (err) {
        console.log(err);
    }

    if(!product){
        return res.status(404).json({message: 'No Product Found'});
    }

    return res.status(200).json({message: 'Product Updated'});
}

//filtrar productos por rangos de precio
export const getProductsByPriceRange = async(req, res, next) => {
    const {minPrice, maxPrice} = req.params;
    console.log(minPrice, maxPrice);
    let products;

    try {
        products = await Product.find({price: {$gte: minPrice, $lte: maxPrice}});
    } catch (err) {
        console.log(err);
    }

    if(!products){
        return res.status(404).json({message: 'No Products Found'});
    }

    return res.status(200).json({products});
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

//filtar productos por color
export const getProductsByColor = async(req, res, next) => {
    const {color} = req.params;
    console.log(color);
    let products;

    try {
        products = await Product.find({colors: color});
    } catch (err) {
        console.log(err);
    }

    if(!products){
        return res.status(404).json({message: 'No Products Found'});
    }

    return res.status(200).json({products});
}