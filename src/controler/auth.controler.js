import User from "../modules/usermodel.js";
import bcrypt from "bcryptjs";
//import mongoose from 'mongoose';
//import jwt from 'jsonwebtoken'
import cloudinary from "../lib/cloudinnary.js";
import { generateTocken } from '../lib/utils.js';




export const signup = async (req, res) => {
    const { fullname, email, password } = req.body;
    try {
        // Hash password using bcryptjs
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }

        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword
        });

        if (newUser) {
            // Generate JWT token here
            generateTocken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilepic: newUser.profilepic,
            });
        } else {
            return res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare passwords
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = generateToken(user._id);  // Assuming this function is implemented

        // Send response with user info and the token
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            profilepic: user.profilepic,
            token,  // Add token to the response
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateprofile = async (req, res) => {
    
    try {
       
        const {  profilepic } = req.body;
    const userId = req.user._id; // Assuming you use some kind of authentication middleware to attach user info
   if(!profilepic){
    res.status(400).json({message:"profile pic is required"});
   }
   const uploadResponce=await cloudinary.uploader.upload(profilepic)
   const uploadUser= await User.findByIdAndUpdate(userId, {profilepic:uploadResponce.secure_url}, {new:true})
   res.status(200).json(uploadUser)
    } catch (error) {
        console.log("Error in updateprofile controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const checkAuth= (req,res)=>{
try{
res.status(200).json(req.user);


}catch(error){
    console.log("Error in chackAuth controller", error.message);
    res.status(500).json({ message: "Internal server error" });

}
};
