import Rol from "../models/Rol";

//middleware para verificar si el usuario es admin
export const isAdmin = async (req, res, next) => {
    let admin;
    try {
        admin = await Rol.findOne({name: 'Admin'});
    } catch (err) {
        return console.log(err);
    }

    if (req.session.user.rol === admin._id.valueOf()) {
        console.log('es admin');
        next();
    } else {
        console.log('no es admin');
        res.redirect('http://localhost:3000/');
    }
}