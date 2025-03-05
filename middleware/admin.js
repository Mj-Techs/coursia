import jwt from 'jsonwebtoken'

 export const AdminMiddleware = (req,res,next) =>{
    const {token} = req.headers
    const decoded  = jwt.verify(token,process.env.ADMIN_JWT_SECRET)
    if(decoded){
        req.userId = decoded.id
        next()
    }else{
        res.status(403).json({message:"you are not signed in"})
    }
 }