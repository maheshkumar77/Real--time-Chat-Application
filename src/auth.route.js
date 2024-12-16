import express from "express";
import {login , logout, signup, updateprofile, checkAuth } from './controler/auth.controler.js'
import { protectRoute } from './middleware/auth.middleware.js'
const router=express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile",protectRoute, updateprofile)
router.get("/chack",protectRoute,checkAuth)
export default router;