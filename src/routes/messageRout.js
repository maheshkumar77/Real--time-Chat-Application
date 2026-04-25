import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { getUserForSidebar,getMessage,sendMessage } from '../controler/messagecontroler.js'
const router=express.Router();

router.get("/users", protectRoute, getUserForSidebar);
router.get("/:id",protectRoute, getMessage);
router.post("/send/:id",protectRoute,sendMessage);
router.get("/users", protectRoute, getUserForSidebar);
router.get("/:id",protectRoute, getMessage);
router.post("/send/:id",protectRoute,sendMessage);
export default router;
# this is the route folder 
# this is the route folder
# this is the route folder
# this is the route folder
