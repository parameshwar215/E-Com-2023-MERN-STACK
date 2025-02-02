// const express=require("express")
// const colors=require("colors")

import express from "express";
import colors from "colors";
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from "./config/db.js";

import authRoute from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors';
 const app=express()

 //dabase coonfig

 connectDB()
//medelware
app.use(morgan('dev'))
app.use(express.json())
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoutes)
dotenv.config();
 app.get("/",(req,res)=>{
    res.send({
        massage:"Building ecommerce website using mernstack"
    })
 })
 const PORT=process.env.PORT || 8080;

 app.listen(PORT,()=>{
    console.log(`server is working  on ${process.env.dev_MODE} on  ${PORT} port`.bgCyan.white);
 })