import { createUser,loginUser } from "../controllers/auth.controller.js";
import {Router} from 'express';

const router = Router();
 // Create Account
 router.post("/signup",createUser);
 router.post('/login',loginUser);

export default router;