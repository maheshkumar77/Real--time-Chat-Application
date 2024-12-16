import User from '../modules/usermodel.js'
import Message from '../modules/mesagemodule.js'
import cloudinary from '../lib/cloudinnary.js';
export const getUserForSidebar=async (req,res)=>{
    try{
    const loggedInUserId= req.user._id;
    const filteredUsers= await User.find({_id: {$ne:loggedInUserId}}).select("-password");

    res.status(200).json(filteredUsers)
    }catch(error){
    console.log(" error in getusersforsliderbar: ", error.message);
    res.status(500).json({error:"internal error"})
    }
}


export const getMessage= async(req,res)=>{
try{
const { id:userToChatId }=req.params
const myId= req.user._id

const message= await Message.find({
    $or:[
       {senderId:myId, receiverid:userToChatId},
       {senderId:userToChatId, receiverid:myId},
    ]
})
res.status(200).json(messages)
}catch(error){
    console.log(" error in getMessage controler: ", error.message);
    res.status(500).json({error:"internal error"})
}

}


export const sendMessage= async (req,res)=>{
    try{
    const { text, image}=req.body;
    const { id: receiverId }= req.params;
    const senderId=req.user._id;
     
    let imageUrl;
    if(image){
        const uploadResponse= await cloudinary.uploader.upload(image);
        imageUrl= uploadResponse.secure_url;
    }
    const newMessage= new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
    });
    await newMessage.save();

    }catch(error){
 console.log(" error in sendMessage controler: ", error.message);
    res.status(500).json({error:"internal error"})
    }
} 