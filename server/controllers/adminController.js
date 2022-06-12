import bcrypt from 'bcryptjs';
import User from "../models/User";
import Rol from "../models/Rol";
import Product from "../models/Product";
import SubCategory from "../models/SubCategorie";
import Category from "../models/Categorie";
import Mark from "../models/Mark";
import ProductImage from '../models/ProductImage';
import Addresse from '../models/Addresse';
import Categorie from '../models/Categorie';
import Item from '../models/Item';
import Excel from 'exceljs'; 


//ver todos los usuarios
export const getAllUser = async(req, res, next) => {
    let users;

    try {
        users = await User.find();
    } catch (err) {
        return console.log(err);
    }

    if(!users){
        return res.status(404).json({message: 'No Users Found'});
    }

    return res.status(200).json({users});
}

//ver todos los productos
export const getAllProduct = async(req, res, next) => {
    let products;
    let productImages;
    let subCategories;
    let categories;
    let marks;

    //validar si hay que ordenar por x 
    if(req.query.orderBy){
        let orderBy = req.query.orderBy;
        let order = req.query.order;

        switch(orderBy){
            case 'name':
                if(order === 'asc'){
                    products = await Product.find().sort({name: 1});
                }else{
                    products = await Product.find().sort({name: -1});
                }
                break;
            case 'price':
                if(order === 'asc'){
                    products = await Product.find().sort({price: 1});
                }else{
                    products = await Product.find().sort({price: -1});
                }
                break;
            case 'discount':
                if(order === 'asc'){
                    products = await Product.find().sort({discount: 1});
                }else{
                    products = await Product.find().sort({discount: -1});
                }
                break;
            case 'stock':
                if(order === 'asc'){
                    products = await Product.find().sort({stock: 1});
                }else{
                    products = await Product.find().sort({stock: -1});
                }
                break;
            case 'subCategorie':
                if(order === 'asc'){
                    products = await Product.find().sort({subCategorie: 1});
                }else{
                    products = await Product.find().sort({subCategorie: -1});
                }
                break;
            case 'mark':
                if(order === 'asc'){
                    products = await Product.find().sort({mark: 1});
                }else{
                    products = await Product.find().sort({mark: -1});
                }
                break;
            default:
                products = await Product.find();
                break;
        }
    }else{
        products = await Product.find();
    }

    if(!products){
        return res.status(404).json({message: 'No Products Found'});
    }

    //traer imagenes de los productos
    for(let i = 0; i < products.length; i++){
        productImages = await ProductImage.find({product: products[i]._id});
        products[i].images = productImages;
    }

    //traer subcategorias
    for(let i = 0; i < products.length; i++){
        subCategories = await subCategories.findById(products[i].subCategorie);
        products[i].subCategorie = subCategories;
    }

    //traer categorias de las subcategorias
    for(let i = 0; i < products.length; i++){
        categories = await Categorie.findById(products[i].subCategorie.categorie);
        products[i].subCategorie.categorie = categories;
    }


    //traer marcas
    for(let i = 0; i < products.length; i++){
        marks = await Mark.findById(products[i].mark);
        products[i].mark = marks;
    }

    return res.status(200).json({products});
}

//traer todas las categorias
export const getAllCategory = async(req, res, next) => {
    let categories;

    try {
        categories = await Category.find();
    } catch (err) {
        return console.log(err);
    }

    if(!categories){
        return res.status(404).json({message: 'No Categories Found'});
    }

    return res.status(200).json({categories});
}

//traer todas las subcategorias
export const getAllSubCategory = async(req, res, next) => {
    let subCategories;

    try {
        subCategories = await SubCategory.find();
    } catch (err) {
        return console.log(err);
    }

    if(!subCategories){
        return res.status(404).json({message: 'No SubCategories Found'});
    }

    return res.status(200).json({subCategories});
}

//traer todas las marcas
export const getAllMark = async(req, res, next) => {
    let marks;

    try {
        marks = await Mark.find();
    } catch (err) {
        return console.log(err);
    }

    if(!marks){
        return res.status(404).json({message: 'No Marks Found'});
    }

    return res.status(200).json({marks});
}

//traer todos los roles
export const getAllRol = async(req, res, next) => {
    let roles;

    try {
        roles = await Rol.find();
    } catch (err) {
        return console.log(err);
    }

    if(!roles){
        return res.status(404).json({message: 'No Roles Found'});
    }

    return res.status(200).json({roles});
}

//crear usuario con rol
export const createUser = async(req, res, next) => {
    const {user, email, password, rol} = req.body;
    
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (err) {
         return console.log(err);
    }

    if(existingUser){
        return res.status(400).json({message: 'User Already Exists! Login Instead'});
    }

    const hashedPassword = bcrypt.hashSync(password);

    let userRol;

    try {
        userRol = await Rol.findOne({name: rol});
    } catch (err) {
        return console.log(err);
    }

    if(!userRol){
        return res.status(404).json({message: 'No Rol Found'});
    }

    const newUser = new User({
        user,
        email,
        password: hashedPassword,
        rol: userRol._id
    });

    try {
        await newUser.save();
    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({newUser});
}

//crear producto
export const createProduct = async(req, res, next) => {
    const {name, mainFeatures, price, discount, barcode, stock, description, colors, size, mark, category, subCategory, image, subDivision} = req.body;

    let newCategory;
    let newSubCategory;

    //guardar categoria
    if(category){
        try {
            newCategory = await Category.findOne({name: category});
        } catch (err) {
            return console.log(err);
        }

        if(!newCategory){
            return res.status(404).json({message: 'No Category Found'});
        }
    }

    //guardar subcategoria
    if(subCategory){
        try {
            newSubCategory = await SubCategory.findOne({name: subCategory});
            newSubCategory.subDivision.push(subDivision);
            newSubCategory.category = newCategory._id;
        } catch (err) {
            return console.log(err);
        }

        if(!newSubCategory){
            return res.status(404).json({message: 'No SubCategory Found'});
        }
    }

    const newProduct = new Product({
        name,
        mainFeatures,
        price,
        discount,
        barcode,
        stock,
        description,
        colors,
        size,
        subCategory: (newSubCategory) ? newSubCategory._id : null,
    });

    try {
        await newProduct.save();
    } catch (err) {
        return console.log(err);
    }

    //guardar imagen
    if(image){ 
        const newProductImage = new ProductImage({
            url: image,
            product: newProduct._id
        });

        try {
            await newProductImage.save();
        } catch (err) {
            return console.log(err);
        }
    }

    //guardar marca
    if(mark){
        let newMark;

        try {
            newMark = await Mark.findOne({name: mark});
        } catch (err) {
            return console.log(err);
        }

        if(!newMark){
            return res.status(404).json({message: 'No Mark Found'});
        }

        newProduct.mark = (newMark) ? newMark._id : null;
    }

    try {
        await newProduct.save();
    }
    catch (err) {
        return console.log(err);
    }

    return res.status(201).json({newProduct});
}

//crear marca
export const createMark = async(req, res, next) => {
    const {name} = req.body;

    let existingMark;

    try {
        existingMark = await Mark.findOne({name});
    } catch (err) {
        return console.log(err);
    }

    if(existingMark){
        return res.status(400).json({message: 'Mark Already Exists'});
    }

    const newMark = new Mark({
        name
    });

    try {
        await newMark.save();
    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({newMark});
}

//crear categoria
export const createCategory = async(req, res, next) => {
    const {name} = req.body;

    let existingCategory;

    try {
        existingCategory = await Category.findOne({name});
    } catch (err) {
        return console.log(err);
    }

    if(existingCategory){
        return res.status(400).json({message: 'Category Already Exists'});
    }

    const newCategory = new Category({
        name
    });

    try {
        await newCategory.save();
    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({newCategory});
}

//crear subcategoria
export const createSubCategory = async(req, res, next) => {
    const {name, category, subDivision} = req.body;

    let existingSubCategory;

    try {
        existingSubCategory = await SubCategory.findOne({name});
    } catch (err) {
        return console.log(err);
    }

    if(existingSubCategory){
        return res.status(400).json({message: 'SubCategory Already Exists'});
    }

    let newCategory;

    try {
        newCategory = await Category.findOne({name: category});
    } catch (err) {
        return console.log(err);
    }

    if(!newCategory){
        return res.status(404).json({message: 'No Category Found'});
    }

    const newSubCategory = new SubCategory({
        name,
        category: newCategory._id,
        subDivision
    });

    try {
        await newSubCategory.save();
    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({newSubCategory});
}

//crear rol
export const createRol = async(req, res, next) => {
    const {name} = req.body;

    let existingRol;

    try {
        existingRol = await Rol.findOne({name});
    } catch (err) {
        return console.log(err);
    }

    if(existingRol){
        return res.status(400).json({message: 'Rol Already Exists'});
    }

    const newRol = new Rol({
        name
    });

    try {
        await newRol.save();
    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({newRol});
}

//actualizar categoria
export const updateCategory = async(req, res, next) => {
    const id = req.params.id;
    const {name} = req.body;

    let existingCategory;

    try {
        existingCategory = await Category.findById(id);
    } catch (err) {
        return console.log(err);
    }

    if(!existingCategory){
        return res.status(404).json({message: 'No Category Found'});
    }

    existingCategory.name = name;

    try {
        await existingCategory.save();
    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({existingCategory});
}

//actualizar producto
export const updateProduct = async(req, res, next) => {
    const id = req.params.id;
    const {name, mainFeatures, price, discount, barcode, stock, description, colors, size, subCategorie, categorie, subDivision, mark, image} = req.body;

    let existingProduct;

    try {
        existingProduct = await Product.findById(id);
    } catch (err) {
        return console.log(err);
    }

    if(!existingProduct){
        return res.status(404).json({message: 'No Product Found'});
    }

    //buscar subcategoria
    let newSubCategory;

    if(subCategorie){
        try {
            newSubCategory = await subCategorie.findOne({name: subCategorie});
        } catch (err) {
            return console.log(err);
        }

        if(!newSubCategory){
            return res.status(404).json({message: 'No SubCategory Found'});
        }

        existingProduct.subCategorie = (newSubCategory) ? newSubCategory._id : null;
    }

    //buscar categoria
    let newCategory;

    if(categorie){
        try {
            newCategory = await Category.findOne({name: categorie});
        } catch (err) {
            return console.log(err);
        }

        if(!newCategory){
            return res.status(404).json({message: 'No Category Found'});
        }

        newSubCategory.categorie = (newCategory) ? newCategory._id : null;
        newSubCategory.subDivision = subDivision;
    }

    existingProduct = {
        name,
        mainFeatures,
        price,
        discount,
        barcode,
        stock,
        description,
        colors,
        size,
        subCategorie,
        mark,
        image
    };

    try {
        await existingProduct.save();
        await newSubCategory.save();
    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({existingProduct});
}

//actualizar subcategoria
export const updateSubCategory = async(req, res, next) => {
    const id = req.params.id;
    const {name, category, subDivision} = req.body;

    let existingSubCategory;

    try {
        existingSubCategory = await SubCategory.findById(id);
    } catch (err) {
        return console.log(err);
    }

    if(!existingSubCategory){
        return res.status(404).json({message: 'No SubCategory Found'});
    }

    let newCategory;

    try {
        newCategory = await Category.findOne({name: category});
    } catch (err) {
        return console.log(err);
    }

    if(!newCategory){
        return res.status(404).json({message: 'No Category Found'});
    }

    existingSubCategory = {
        name,
        category: newCategory._id,
        subDivision
    };

    try {
        await existingSubCategory.save();
    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({existingSubCategory});
}

//actualizar rol por id
export const updateRol = async(req, res, next) => {
    const id = req.params.id;

    let existingRol;

    try {
        existingRol = await Rol.findById(id);
    } catch (err) {
        return console.log(err);
    }

    if(!existingRol){
        return res.status(404).json({message: 'No Rol Found'});
    }

    existingRol.name = name;

    try {
        await existingRol.save();
    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({existingRol});
}

//actualizar marca por id
export const updateMark = async(req, res, next) => {
    const id = req.params.id;

    let existingMark;

    try {
        existingMark = await Mark.findById(id);
    } catch (err) {
        return console.log(err);
    }

    if(!existingMark){
        return res.status(404).json({message: 'No Mark Found'});
    }

    existingMark.name = name;

    try {
        await existingMark.save();
    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({existingMark});
}

//eliminar categoria por id y eliminar subcategorias
export const deleteCategory = async(req, res, next) => {
    const id = req.params.id;

    let existingCategory;

    try {
        existingCategory = await Category.findById(id);
    } catch (err) {
        return console.log(err);
    }

    if(!existingCategory){
        return res.status(404).json({message: 'No Category Found'});
    }

    try {
        await SubCategory.deleteMany({category: existingCategory._id});
    } catch (err) {
        return console.log(err);
    }

    try {
        await existingCategory.remove();
    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({existingCategory});
}

//eliminar subcategoria por id y remover asociacion con productos
export const deleteSubCategory = async(req, res, next) => {
    const id = req.params.id;

    let existingSubCategory;

    try {
        existingSubCategory = await SubCategory.findById(id);
    } catch (err) {
        return console.log(err);
    }

    if(!existingSubCategory){
        return res.status(404).json({message: 'No SubCategory Found'});
    }

    try {
        await Product.deleteMany({subCategory: existingSubCategory._id});
    } catch (err) {
        return console.log(err);
    }

    try {
        await existingSubCategory.remove();
    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({existingSubCategory});
}

//eliminar rol por id y asignarle el rol de usuario por defecto
export const deleteRol = async(req, res, next) => {
    const id = req.params.id;

    let existingRol;

    try {
        existingRol = await Rol.findById(id);
    } catch (err) {
        return console.log(err);
    }

    if(!existingRol){
        return res.status(404).json({message: 'No Rol Found'});
    }

    try {
        await User.updateMany({rol: existingRol._id}, {rol: '5e9b8f9b8f9b8e2f8c8f9b8'});  //rol por defecto
    } catch (err) {
        return console.log(err);
    }

    try {
        await existingRol.remove();
    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({existingRol});
}

//eliminar marca por id y remover asociaciones con productos
export const deleteMark = async(req, res, next) => {
    const id = req.params.id;

    let existingMark;

    try {
        existingMark = await Mark.findById(id);
    } catch (err) {
        return console.log(err);
    }

    if(!existingMark){
        return res.status(404).json({message: 'No Mark Found'});
    }

    try {
        await Product.deleteMany({mark: existingMark._id});
    } catch (err) {
        return console.log(err);
    }

    try {
        await existingMark.remove();
    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({existingMark});
}

//eliminar producto por id y eliminar imagenes asociadas
export const deleteProduct = async(req, res, next) => {
    const id = req.params.id;

    let existingProduct;
    let imageProduct;

    try {
        existingProduct = await Product.findById(id);
    } catch (err) {
        return console.log(err);
    }

    if(!existingProduct){
        return res.status(404).json({message: 'No Product Found'});
    }

    try {
       imageProduct = await Image.findOne({product: existingProduct._id});
    } catch (err) {
        return console.log(err);
    }

    try {
        await existingProduct.remove();
        await imageProduct.remove();
    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({existingProduct});
}

//eliminar usuario por id y eliminar Adresses asociadas
export const deleteUser = async(req, res, next) => {
    const id = req.params.id;

    let existingUser;
    let existingAddress;

    try {
        existingUser = await User.findById(id);
    } catch (err) {
        return console.log(err);
    }

    if(!existingUser){
        return res.status(404).json({message: 'No User Found'});
    }

    try {
        existingAddress = await Addresse.findOne({user: existingUser._id});
    } catch (err) {
        return console.log(err);
    }

    try {
        await existingUser.remove();
        await existingAddress.remove();
    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({existingUser});
}

//filtrar usuarios por nombre
export const getUsersByName = async(req, res, next) => {
    const {name} = req.params;
    let users;

    try {
        users = await User.find( {user: {$regex: name, $options: 'i'}});
    } catch (err) {
        return console.log(err);
    }

    if(users.length < 1){
        return res.status(404).json({message: 'No Users Found'});
    }

    return res.status(200).json({users});
}

//mostar listado de item y el usuario que los creo
export const getItemsByUser = async(req, res, next) => {
    const {id} = req.params;
    let items;

    try {
        items = await Item.find({user: id});
    } catch (err) {
        return console.log(err);
    }

    if(items.length < 1){
        return res.status(404).json({message: 'No Items Found'});
    }

    return res.status(200).json({items});
}

//exportar productos con xlsx
export const exportProducts = async(req, res, next) => {
    let products;

    try {
        products = await Product.find({});
    } catch (err) {
        return console.log(err);
    }

    if(products.length < 1){
        return res.status(404).json({message: 'No Products Found'});
    }

    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Products');

    worksheet.columns = [
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Description', key: 'description', width: 30 },
        { header: 'Price', key: 'price', width: 30 },
        { header: 'Stock', key: 'stock', width: 30 },
        { header: 'Category', key: 'category', width: 30 },
        { header: 'SubCategory', key: 'subCategory', width: 30 },
        { header: 'Mark', key: 'mark', width: 30 },
        { header: 'Image', key: 'image', width: 30 },
        { header: 'Color', key: 'colors', width: 30 },
        { header: 'Size', key: 'size', width: 30 }
    ];

    worksheet.addRows(products);

    const fileName = 'products.xlsx';

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);

    workbook.xlsx.write(res).then(function() {
        res.end();
    });
}

//exportar items y el usuario que los creo con xlsx
export const exportItems = async(req, res, next) => {
    let items;

    try {
        items = await Item.find({});
    } catch (err) {
        return console.log(err);
    }

    if(items.length < 1){
        return res.status(404).json({message: 'No Items Found'});
    }

    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Items');

    worksheet.columns = [
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Description', key: 'description', width: 30 },
        { header: 'Price', key: 'price', width: 30 },
        { header: 'Stock', key: 'stock', width: 30 },
        { header: 'Category', key: 'category', width: 30 },
        { header: 'SubCategory', key: 'subCategory', width: 30 },
        { header: 'Mark', key: 'mark', width: 30 },
        { header: 'Image', key: 'image', width: 30 },
        { header: 'Color', key: 'colors', width: 30 },
        { header: 'Size', key: 'size', width: 30 },
        { header: 'User', key: 'user', width: 30 }
    ];

    worksheet.addRows(items);

    const fileName = 'items.xlsx';

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);

    workbook.xlsx.write(res).then(function() {
        res.end();
    });
}

//cargar productos con xlsx
export const importProducts = async(req, res, next) => {
    const file = req.file;
    const workbook = await Excel.readFile(file.path);
    const worksheet = workbook.getWorksheet('Products');
    const rows = worksheet.getColumn(1);
    const products = [];
    const produtsExist = [];

    for (let i = 1; i < rows.length; i++) {
        const product = {
            name: worksheet.getCell(i, 1).value,
            description: worksheet.getCell(i, 2).value,
            price: worksheet.getCell(i, 3).value,
            stock: worksheet.getCell(i, 4).value,
            category: worksheet.getCell(i, 5).value,
            subCategory: worksheet.getCell(i, 6).value,
            mark: worksheet.getCell(i, 7).value,
            image: worksheet.getCell(i, 8).value,
            colors: worksheet.getCell(i, 9).value,
            size: worksheet.getCell(i, 10).value
        };

        products.push(product);
    }

    try {
        //validar que el producto no exista
        for (let i = 0; i < products.length; i++) {
            const product = await Product.findOne({name: products[i].name});
            if(product){
                //agregar el producto a la lista de productos existentes
                produtsExist.push(product);
            }

            const newProduct = new Product(products[i]);
            await newProduct.save();
        }
    } catch (err) {
        return console.log(err);
    }

    let data = {
        products: products,
        productsExist: produtsExist
    }

    return res.status(200).json(data);
}


//agregar varios productos a destacado
export const addProductsToFeatured = async(req, res, next) => {
    const {id} = req.body;
    let products;

    try {
        products = await Product.find({_id: {$in: id}});
    }
    catch (err) {
        return console.log(err);
    }

    if(products.length < 1){
        return res.status(404).json({message: 'No Products Found'});
    }

    try {
        await Product.updateMany({ _id: { $in: id } }, { $set: { outstanding: true}});
    }
    catch (err) {
        return console.log(err);
    }

    return res.status(200).json({products});
}

//traer productos destacados
export const getFeaturedProducts = async(req, res, next) => {
    let products;

    try {
        products = await Product.find({outstanding: true});
    }
    catch (err) {
        return console.log(err);
    }

    if(products.length < 1){
        return res.status(404).json({message: 'No Products Found'});
    }

    return res.status(200).json({products});
}


