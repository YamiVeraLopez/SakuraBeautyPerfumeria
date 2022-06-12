import bcrypt from 'bcryptjs';
import User from "../models/User";
import session from 'express-session';
import Addresse from '../models/Addresse';
import fs from 'fs';

//registrarse
export const register = async(req, res, next) => {
    const {user, email, password, repassword} = req.body;
    
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (err) {
       return console.log(err);
    }

    if(existingUser){
        return res.status(400).json({message: 'User Already Exists! Login Instead'});
    }

    if(password !== repassword){
        return res.status(400).json({message: 'Passwords do not match'});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const client = new User({
        user,
        email,
        password: hashedPassword,
        firstName: null,
        lastName: null,
        phone: null,
        avatar: null,
        rolesId: '6285473ead4edb5a224f5d68',
        addressId:[]
    });

    try {
        await client.save();
    } catch (err) {
       return console.log(err);
    }
    return res.status(201).json({client});
}

//formulario de registro
export const getRegister = async(req, res, next) => {
    //retorna vista de registro de usuario
    res.render('http://localhost:3000/user/register');
}

//formulario de login
export const getLogin = async(req, res, next) => {
    //retorna vista de login de usuario
    res.render('http://localhost:3000/user/login');
}

//iniciar sesion
export const login = async(req, res, next) => {

    const { email, password } = req.body;

    console.log(email, password);
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (err) {
       return console.log(err);
    }

    if(!existingUser){
        return res.status(404).json({message: 'Couldnt Find User By This Email'});
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message: 'Incorrect Password'});
    }

    //checkeo recordar sesion
    if(req.body.rememberMe){
        req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
    } else {
        req.session.cookie.expires = false;
    }

    req.session.user = {
        id: existingUser._id,
        rol: existingUser.rolesId,
    }

    res.cookie("userSakuraBeauty", req.session.user, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
    });

    return res.status(200).json({message:'Login Successfull', existingUser, session});
}

//cerrar sesion
export const logout = async(req, res, next) => {
    req.session.destroy();
    return res.status(200).json({message: 'Logout Successfull'});
}

//formulario de actualizar datos
export const getUpdate = async(req, res, next) => {
    let user;
    try{
        user = await User.findById(req.session.user.id);
    } catch (err) {
        return console.log(err);
    }

    //retorna vista de actualizar datos de usuario
    res.render('http://localhost:3000/user/update', {user});
}

//updateUser
export const updateUser = async(req, res, next) => {
    const id = req.params.id;
    const {user, email, password, firstName, lastName, phone, address, city, state, country, postalCode} = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(id);
    } catch (err) {
         return console.log(err);
    }
    
    if(!existingUser){
        return res.status(404).json({message: 'No User Found'});
    }

    //guardar Addresse
    const addresse = new Addresse({
        address,
        city,
        state,
        country,
        postalCode,
        userId: id
    });

    try {
        await addresse.save();
    } catch (err) {
        return console.log(err);
    }

    //traer Addresse
    let addresseId;
    try {
        addresseId = await Addresse.findOne({userId: id});
    } catch (err) {
        return console.log(err);
    }

    //actualizar Ususario
    existingUser = {
        user: (user) ? user : existingUser.user,
        email: (email) ? email : existingUser.email,
        password: (password) ? bcrypt.hashSync(password) : existingUser.password,
        firstName: (firstName) ? firstName : (existingUser.firstName) ? existingUser.firstName : null,
        lastName: (lastName) ? lastName : (existingUser.lastName) ? existingUser.lastName : null,
        phone: (phone) ? phone : (existingUser.phone) ? existingUser.phone : null,
        addressId: (addresseId) ? addresseId._id : existingUser.addressId
    };

    try {
        await User.findByIdAndUpdate(id, existingUser);
    } catch (err) {
        return console.log(err);
    }

    return res.status(200).json({message: 'User Updated', existingUser});
}

//delete a user
export const deleteUser = async (req, res) => {
    const id = req.params.id;

    let client;

    try {
        client = await User.findOneByIdAndRemove(id)
    }catch (err) {
        return console.log(err);
    }
    return res.status(200).json({message: 'User deleted'});
}

//get all users by rol
export const getAllUsersByRol = async(req, res, next) => {
    const rolId = req.params.rolId;
    console.log(req.params);
    let users;

    try {
        users = await User.find({rolesId: rolId});
    } catch (err) {
        return console.log(err);
    }

    if(!users){
        return res.status(404).json({message: 'No Users Found'});
    }

    return res.status(200).json({users});
}

//subir avatar
export const uploadAvatar = async (req, res, next) => {
    const id = req.params.id;
    const {avatar} = req.body;

    console.log(req.body);
	if(!avatar){
		return res.status(400).json({message: 'No avatar provided'});
	}

    let existingUser;
    try {
        existingUser = await User.findById(id);
    } catch (err) {
        return console.log(err);
    }

    if(!existingUser){
        return res.status(404).json({message: 'No User Found'});
    }

    //guardar avatar
    const avatarPath = `${id}-${Date.now()}.jpg`;
    const avatarUrl = `${req.protocol}://${process.env.FRONT_HOST}/public/img/avatar/${avatarPath}`;

    const fileBuffer = Buffer.from(avatar.replace(/^data:image\/\w+;base64,/, ""), 'base64');

    try {
        await fs.writeFileSync(`./public/img/avatar/${avatarPath}`, fileBuffer);
    } catch (err) {
        return console.log(err);
    }

    //actualizar usuario
    existingUser = {
        avatar: avatarUrl
    };

    try {
        await User.findByIdAndUpdate(id, existingUser);
    } catch (err) {
        return console.log(err);
    }

    return res.status(200).json({message: 'Avatar Updated', existingUser});
}