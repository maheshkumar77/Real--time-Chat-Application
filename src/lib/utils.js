import jwt from 'jsonwebtoken'

export const generateTocken=(userId, res)=>{
const tocken=jwt.sign({userId}, process.env.JWT_SECTET, {
    expiresIn:"7d"
})

res.cookie("jwt",tocken, {
    maxAge: 7 * 24 * 60 * 1000,//mili second
    httpOnly: true, //prevent xss attacks cross-site scripting attsckes
    sameSite: "strict", //CSRF attacks cross-site request forgery attackes
   secure: process.env.NODE_ENV !== "development" 
})

}