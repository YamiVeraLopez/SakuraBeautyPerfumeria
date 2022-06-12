import ValorationProduct from '../models/valorationProduct';

//agregar valoracion
export const addValoration = async(req, res, next) => {
    const {userId, productId, valoration, opinions} = req.body;

    const newValoration = new ValorationProduct({
        userId,
        productId,
        valoration,
        opinions
    });

    try {
        await newValoration.save();
    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({newValoration});
}

//traer valoraciones de un producto
export const getValorationProduct = async(req, res, next) => {
    const {productId} = req.params;

    let valorationProduct;
    try {
        valorationProduct = await ValorationProduct.find({productId});
    } catch (err) {
        return console.log(err);
    }

    return res.status(200).json({valorationProduct});
}
