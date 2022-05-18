import User from "../models/User";
import bcrypt from 'bcryptjs';
import Rol from "../models/Rol";

//traer todos los usuarios
export const getAllUser = async(req, res, next) => {
    let users;

    let rol = await Rol.findById('6285473ead4edb5a224f5d68');

    console.log(rol);
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
    }

    if(!users){
        return res.status(404).json({message: 'No Users Found'});
    }

    return res.status(200).json({users});
}

//traer usuario por id
export const getUserById = async(req, res, next) => {
    const id = req.params.id;

    let user;

    try {
        user = await User.findById(id);
    } catch (err) {
        return console.log(err);
    }

    if(!user){
        return res.status(404).json({message: 'No User Found'});
    }

    return res.status(200).json({user});
}

//registrarse
export const register = async(req, res, next) => {
    const {user, email, password} = req.body;
    
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

//iniciar sesion
export const login = async(req, res, next) => {
    const {email, password} = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (err) {
       return console.log(err);
    }

    if(!existingUser){
        return res.status(404).json({message: 'Couldnt Find User By This Email '});
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message: 'Incorrect Password'});
    }

    return res.status(201).json({message: 'Login Successfull'});
}