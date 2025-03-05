import jwt from 'jsonwebtoken'

 export const UserMiddleware = (req,res,next) =>{
    const {token} = req.headers
    const decoded  = jwt.verify(token,process.env.USER_JWT_SECRET)
    if(decoded){
        req.userId = decoded.id
        next()
    }else{
        res.status(403).json({message:"you are not signed in"})
    }
 }