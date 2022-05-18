import express from "express";
import { getAllUser, register, login, getUserById } from "../controllers/userController";

const router = express.Router();

router.get('/', getAllUser);
router.get('/:id', getUserById);
router.post('/register',register);
router.post('/login', login )
export default router;