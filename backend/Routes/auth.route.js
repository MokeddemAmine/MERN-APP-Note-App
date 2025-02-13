import { createUser,loginUser, getUser } from "../controllers/auth.controller.js";
import {Router} from 'express';
import { authenticateToken } from "../utilities.js";

const router = Router();
 // Create Account
 router.post("/signup",createUser);
 router.post('/login',loginUser);
 router.get('/user',authenticateToken,getUser);

export default router;