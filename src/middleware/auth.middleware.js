import jwt from "jsonwebtoken"
import User from "../modules/usermodel.js"

export const protectRoute= async (req,res,next)=>{
    try{
   const tocken =req.cookies.jwt
   if(!tocken){
    return res.status(401).json({message:"unauthorised -No tocken provided"})

   }

const decoded=jwt.verify(tocken.process.env.JWT_SECRET)
if(!decoded) {
    return res.status(401).json({message:" unauthorised - invelid tocken"});
}
const user =await User.findById(decoded.userId).select("-password");
if(!user){
    return res.status(401).json({message:" user not found"});
}

req.user =user
next();
    }catch(error){
  console.log("error in protectRout midleware", error.message);
  res.send(500).json({message:"internal error"})
    }
}
