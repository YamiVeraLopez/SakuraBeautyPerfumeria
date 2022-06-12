import express from "express";
import { getRegister, register, login, logout, updateUser, uploadAvatar, getLogin} from "../controllers/userController";
import { userInSession } from "../middlewares/userInSession";
import ForgotPassword from "../controllers/forgotPasswordController";
import ResetPassword from "../controllers/resetPasswordController";

const router = express.Router();

//session
router.get("/register", getRegister);
router.post('/register',register);
router.get("/login", getLogin);
router.post('/login', login);
router.post('/logout', logout);

//update user
//router.get('/update', userInSession, getUpdateUser);
router.put('/update/:id', userInSession, updateUser);
//upload avatar
router.post('/upload/:id', uploadAvatar);

//recuperar contraseña
router.post('/recover', ForgotPassword.sendEmail);
router.put('/forgotPassword/:id/:token', ResetPassword.rest);
export default router;