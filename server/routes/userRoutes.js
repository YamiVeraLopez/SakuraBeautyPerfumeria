import express from "express";
import { getAllUser, register, login, getUserById, getAllUsersByRol, getUsersByName } from "../controllers/userController";

const router = express.Router();

router.get('/', getAllUser);
router.get('/:id', getUserById);
router.get('/rol/:rolId', getAllUsersByRol);
router.get('/user/:name', getUsersByName);

//session
router.post('/register',register);
router.post('/login', login );
export default router;