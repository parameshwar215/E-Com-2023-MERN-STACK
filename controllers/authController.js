import mongoose from "mongoose"
import { comparePassword, hashPassword } from "../helper/authHelper.js"
import User from "../models/User.js"
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();
export const  registerController=async(req,res)=>{

    try{
        const {name,email,password,phone,role,address,answer}=req.body
        //Validations

        if(!name){
            return res.send({massage:"Name is required"})
        }
        if(!email){
            return res.send({massage:" email is required"})
        }
        if(!password){
            return res.send({massage:" password is required"})
        }
        if(!phone){
            return res.send({massage:" phone is required"})
        }
        
        if(!address){
            return res.send({massage:"address is required"})
        }
        if(!answer){
            return res.send({massage:"answer is required"})
        }
        //existing
        const existingUser=await User.findOne({email})

        if(existingUser){
            return res.status(200).send({
                success:false,
                massage:"Already registered Please Loign"
            })
        }

        //user Registration
        const hashedPassword=await hashPassword(password)
        const user=new User({name,email,phone,role,answer,address,password:hashedPassword}).save()
        res.status(200).send({
            success:true,
            massage:"user registered succesesfully ",
            user

        })
    }catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        massage:"Error in registration",
        error
    })
    }

}
export const  loginController=async(req,res)=>{

    try{
        const {email,password}=req.body
        if(!email|| !password){
            return res.status(400).send({
                success:false,
                massage:"Invalind email or Password"
            })
        }

        const user=await User.findOne({email})
        if(!user){
           return  res.status(400).send({
                success:false,
                massage:"user not register yet!"
            })
        }
        const match=await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                massage:"Invalid  Password"
            })
        }

       //Token Creation
       const token=await JWT.sign({_id:user._id},process.env.JWT_SECRETE,{expiresIn:"7d"});
       res.status(200).send({
        success:true,
        massage:"login successfully",
       /// user:user
        user:{
            name:user.name,
            email:user.email,
            phone:user.phone,
            address:user.address,
            _id:user._id,
            role:user.role

        },
        token
       })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            massage:"Error in Login"
        })
    }

}

export const testController=(req,res)=>{
    res.send("Protected route")
}

export const forgotPasswordController=async(req,res)=>{
    try{
        const {email,answer,newPassword}=req.body;
        if(!email){
            return res.send({massage:" email is required"})
        }
        if(!answer){
            return res.send({massage:" answer is required"})
        }

        if(!newPassword){
            return res.send({massage:" new password is required"})
        }
        //check
        const user=await User.findOne({email,answer});
        //validation

        if(!user){
            return res.status(201).send({
                success:false,
                massage:"wrong email or password"
            })

        }
        const hashed=await hashPassword(newPassword)
        await User.findByIdAndUpdate(user._id,{password:hashed});
        res.status(200).send({
            success:true,
            massage:"password reset successfully"
        })

    }catch(error){
        res.status(500).send({
            success:false,
            massage:"somthing went wrong",
            error
        })
    }
}
    
