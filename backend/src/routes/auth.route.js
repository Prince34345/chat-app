import express from 'express';
import {signup, login, logout, updateProfilePic, checkAuth} from "../controllers/auth.controller.js";
import { protectAuthRoute } from '../middleware/auth.middleware.js';
const router = express.Router();


router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout); 

router.put("/update-profile-pic", protectAuthRoute, updateProfilePic)
router.get("/check-auth", protectAuthRoute, checkAuth);
export default router;