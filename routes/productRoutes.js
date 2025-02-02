import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { createProductController, deleteProductController, getPhotoController, getProductController, getProductsController, updateProductController } from "../controllers/productController.js";
import formidable from 'express-formidable'
const router=express.Router()


//create product
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)

//update product
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)

//get all products
router.get('/get-products',getProductsController)

//get sinle product
router.get('/get-product/:slug',getProductController)

//get photo
router.get('/product-photo/:pid',getPhotoController)

//delete product
router.delete('/delete-product/:id',requireSignIn,isAdmin,deleteProductController)
export default router