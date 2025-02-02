import JWT from 'jsonwebtoken'
import dotenv from 'dotenv';
import User from '../models/User.js'

dotenv.config()
export const requireSignIn=async(req,res,next)=>{
    try{
        const decode=JWT.verify(req.headers.authorization,process.env.JWT_SECRETE)
        req.user=decode;
        next()

    }catch(error){
        console.log(error)
    }
}

export const isUser=async (req,res,next)=>{
    try{
        const u=await User.findById(req.user._id)
        if(u.role===0){
            next()
            
        }
        else{
            return res.status(400).send({
                success:false,
                massage:"Un-Authorized login"
            })
        }


    }catch(error){
        console.log(error)
        res.status(400).send({
            success:false,
            error,
            massage:"error in admin middleware"
        })
    }
}

export const isAdmin=async (req,res,next)=>{
    try{
        const u=await User.findById(req.user._id)
        if(u.role!==1){
            return res.status(400).send({
                success:false,
                massage:"Un-Authorized login"
            })
        }
        else{
            next()
        }


    }catch(error){
        console.log(error)
        res.status(400).send({
            success:false,
            error,
            massage:"error in admin middleware"
        })
    }
}