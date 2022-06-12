import Favorite from "../models/favorite";
import Product from "../models/Product";

//obtener favoritos
export const getFavorites = async(req, res, next) => {
    let favorites;
    try {
        favorites = await Favorite.findOne({user: req.session.user.id});
    } catch (err) {
        console.log(err);
    }

    if(!favorites){
        return res.status(404).json({message: 'No Favorites Found'});
    }

    return res.status(200).json(favorites);
}

//marcar producto como favorito
export const addToFavorites = async(req, res, next) => {
    const {id} = req.params;

    let product;

    try {
        product = await Product.findById(id);
    } catch (err) {
        console.log(err);
    }

    if(!product){
        return res.status(404).json({message: 'No Product Found'});
    }

    let favorites;
    try {
        favorites = await Favorite.findOne({user: req.session.user.id});
    } catch (err) {
        console.log(err);
    }

    if(!favorites){
        //crear favoritos
        const favorites = new Favorite({
            user: req.session.user.id,
            products: [product]
        });

        try {
            await favorites.save();
        } catch (err) {
            console.log(err);
        }

    } else {
        //validar que el producto no este en favoritos
        const index = favorites.products.findIndex(p => p.toString() === id);
        if(index === -1){
            favorites.products.push(product);
            try {
                await favorites.save();
            } catch (err) {
                console.log(err);
            }
        } else {
            //quitar producto de favoritos
            favorites.products.splice(index, 1);
            try {
                await favorites.save();
            } catch (err) {
                console.log(err);
            }
        }
    }

    return res.status(200).json(favorites);
}


//eliminar producto de favoritos
export const removeFromFavorites = async(req, res, next) => {
    const {id} = req.params;

    let product;

    try {
        product = await Product.findById(id);
    } catch (err) {
        console.log(err);
    }

    if(!product){
        return res.status(404).json({message: 'No Product Found'});
    }

    let favorites;
    try {
        favorites = await Favorite.findOne({user: req.session.user.id});
    } catch (err) {
        console.log(err);
    }

    if(!favorites){
        return res.status(404).json({message: 'No Favorites Found'});
    }

    //eliminar producto de favoritos
    favorites.products = favorites.products.filter(product => product._id != id);
    try {
        await favorites.save();
    } catch (err) {
        console.log(err);
    }

    return res.status(200).json({message: 'Product Removed from Favorites'});
}


//vaciar favoritos
export const emptyFavorites = async(req, res, next) => {
    let favorites;
    try {
        favorites = await Favorite.findOne({user: req.session.user.id});
    } catch (err) {
        console.log(err);
    }

    if(!favorites){
        return res.status(404).json({message: 'No Favorites Found'});
    }

    try {
        await Favorite.findByIdAndDelete(favorites._id);
    } catch (err) {
        console.log(err);
    }

    return res.status(200).json({message: 'Favorites Emptied'});
}