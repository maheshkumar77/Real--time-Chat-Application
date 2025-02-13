import mongoose from 'mongoose'

export const conectDB= async ()=>{
    try{
        const con= await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongo conected");
    }catch (cerror){
      console.log(error);
    }
}