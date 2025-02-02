import slugify from 'slugify';
import productModel from '../models/productModel.js';
import fs from 'fs'
import { toNamespacedPath } from 'path';
export const createProductController = async (req, res) => {
    try {
        const { name, slug, price, description, category, quantity, shipping } = req.fields
        const { photo } = req.files
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "name is required" });
            case !description:
                return res.status(500).send({ error: "description is required" });
            case !category:
                return res.status(500).send({ error: "category is required" });
            case !price:
                return res.status(500).send({ error: "price is required" });
            case !quantity:
                return res.status(500).send({ error: "quantity is required" });
            
            case !photo && photo.size>1000000:
                return res.status(500).send({ error: "photo is required and should be less than 1mb" }); 
        }
         const products=await new  productModel({...req.fields,slug:slugify(name)})
         if(photo){
            products.photo.data=fs.readFileSync(photo.path);
            products.photo.contentType=photo.type;
           }
           await products.save()
           res.status(200).send({
            success:true,
            massage:"Produce created successefully",
            products
           })

    } catch(error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "Error while creating product",
            error
        })
    }

}

export const getProductsController=async(req,res)=>{
    try{
        const products=await productModel.find({}).populate("category").select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            massage:"all product List",
            total_count:products.length,
            products
            
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            massage:"Error while getting products list",
            error
        })
    }

}
//get single-product
export const getProductController=async(req,res)=>{
    const {slug}=req.params;
    try{
        const product=await productModel.findOne({slug:slug}).populate("category").select("-photo");
        res.status(200).send({
            success:true,
            massage:"product details",
            product
        })

    }catch(error){
        console.log(error)
        res.send(500).send({
            success:false,
            massage:"Error while getting products",
            error
        })
    }

}
export const getPhotoController=async(req,res)=>{
    
    try{
        const product =await productModel.findById(req.params.pid).select("photo");
        if(product.photo.data){
            res.set("Content-type",product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:true,
            massage:"error while getting product",
            error
        })
    }

}
export const deleteProductController=async(req,res)=>{
    try{
        await productModel.findByIdAndDelete(req.params.id).select('-photo')
        res.status(200).send({
            success:true,
            massage:"product deleted successfully"
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            massage:"Error accured while deleting product",
            error
        })
    }

}

//update product 
export const updateProductController=async(req,res)=>{
    try {
        const { name, slug, price, description, category, quantity, shipping } = req.fields
        const { photo } = req.files
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "name is required" });
            case !description:
                return res.status(500).send({ error: "description is required" });
            case !category:
                return res.status(500).send({ error: "category is required" });
            case !price:
                return res.status(500).send({ error: "price is required" });
            case !quantity:
                return res.status(500).send({ error: "quantity is required" });
            
            case !photo && photo.size>1000000:
                return res.status(500).send({ error: "photo is required and should be less than 1mb" }); 
        }
         const products=await productModel.findByIdAndUpdate(req.params.pid,
            {...req.fields,slug:slugify(name)},
            {new:true})
         if(photo){
            products.photo.data=fs.readFileSync(photo.path);
            products.photo.contentType=photo.type;
           }
           await products.save()
           res.status(200).send({
            success:true,
            massage:"Produce updated successefully",
            products
           })

    } catch(error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "Error while updating product",
            error
        })
    }
    
}