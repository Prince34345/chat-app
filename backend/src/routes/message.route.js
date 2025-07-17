import express from 'express';
import { protectAuthRoute } from '../middleware/auth.middleware.js';
import { getCurrentMessages, getUsersforSidebar, sendMessages } from '../controllers/message.controller.js';


const router = express.Router()

router.get("/users", protectAuthRoute, getUsersforSidebar)
router.get("/:id", protectAuthRoute, getCurrentMessages)
router.post("/send/:id", protectAuthRoute, sendMessages)
export default router