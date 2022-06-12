import Product from "../models/Product";
import Item from "../models/Item";
import Cart from "../models/Cart";


//obtener carrito
export const getCart = async(req, res, next) => {
    let cart;
    try {
        cart = await Cart.findOne({user: req.session.user.id});
    } catch (err) {
        console.log(err);
    }

    if(!cart){
        return res.status(404).json({message: 'No Cart Found'});
    }

    return res.status(200).json(cart);
}

//agregar producto al carrito de compras
export const addToCart = async(req, res, next) => {
    const {id, quantity} = req.params;

    let product;

    try {
        product = await Product.findById(id);
    } catch (err) {
        console.log(err);
    }

    if(!product){
        return res.status(404).json({message: 'No Product Found'});
    }

    const newQuantity = product.stock - quantity;
    if(newQuantity < 0){
        return res.status(400).json({message: 'Not Enough Stock'});
    }

    //discount
    let discount = 0;
    if(product.discount){
        discount = product.discount;
    }

    //subtotal aplicando descuento
    const subTotal = product.price * quantity;
    const total = subTotal - (subTotal * discount / 100);


    //add product to Item
    const item = new Item({
        product: product._id,
        user: req.session.user.id,
        quantity,
        price: product.price,
        discount: product.discount,
        total,
        subTotal,
        name: product.name,
        barcode: product.barcode
    });

    try {
        await item.save();
    } catch (err) {
        console.log(err);
    }

    //validar que el usuario tenga un carrito
    let cart;
    try {
        cart = await Cart.findOne({user: req.session.user.id});
    } catch (err) {
        console.log(err);
    }

    if(!cart){
        //crear carrito
        const cart = new Cart({
            user: req.session.user.id,
            items: [item],
            total: item.total,
            totalItems: item.quantity,
            size: item.size,
            color: item.color
        });

        try {
            await cart.save();
        } catch (err) {
            console.log(err);
        }
    } else {
        //agregar item al carrito
        cart.items.push(item);
        try {
            await cart.save();
        } catch (err) {
            console.log(err);
        }
    }

    //update stock
    try {
        await Product.findByIdAndUpdate(id, {stock: newQuantity});
    } catch (err) {
        console.log(err);
    }

    return res.status(200).json({message: 'Product Added to Cart'});
}

//vacia el carrito y eliminar items
export const emptyCart = async(req, res, next) => {
    let cart;
    try {
        cart = await Cart.findOne({user: req.session.user.id});
    } catch (err) {
        console.log(err);
    }

    if(!cart){
        return res.status(404).json({message: 'No Cart Found'});
    }

    try {
        await Item.deleteMany({cart: cart._id});
        await Cart.findByIdAndDelete(cart._id);
    } catch (err) {
        console.log(err);
    }

    return res.status(200).json({message: 'Cart Emptied'});
}

//eliminar producto del carrito
export const deleteFromCart = async(req, res, next) => {
    const {id} = req.params;

    let item;
    try {
        item = await Item.findById(id);
    } catch (err) {
        console.log(err);
    }

    if(!item){
        return res.status(404).json({message: 'No Item Found'});
    }

    //update stock
    let product;
    try {
        product = await Product.findById(item.product);
    } catch (err) {
        console.log(err);
    }

    if(!product){
        return res.status(404).json({message: 'No Product Found'});
    }

    const newQuantity = product.stock + item.quantity;

    try {
        await Product.findByIdAndUpdate(item.product, {stock: newQuantity});
    } catch (err) {
        console.log(err);
    }

    try {
        await Item.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }

    return res.status(200).json({message: 'Product Deleted from Cart'});
}