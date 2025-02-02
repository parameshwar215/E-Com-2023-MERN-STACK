import categoryModel from "../models/CategoryModel.js";
import slugify from 'slugify';

export const   createCategoryController=async(req,res)=>{
    try{
        const {name}=req.body;
        if(!name){
            return resizeBy.status(401).send({massage:"name is required"})
        }
        const existing=await categoryModel.findOne({name})
        if(existing){
            return res.status(200).send({
                success:true,
                massage:"Category Already Exists"
            })
        }
        const category =await new categoryModel({name,slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            massage:"category created",
            category

        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            massage:"Error in Category creation",
            error
        })
    }

}
//update category
export const updateCategoryController=async(req,res)=>{
    try{

        const {name}=req.body
        const {id}=req.params
        const category=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        
        res.status(200).send({
            success:true,
            massage:"Category updated successfully",
            category
        })
       }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            massage:"Error while updating category",
            error
        })

    }

}
export const categoryController=async (req,res)=>{
    try{
        const category=await categoryModel.find({})
        res.status(200).send({
            success:true,
            massage:"All Category list",
            category
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            massage:"ERROR WHILE GETTING ALL CATEGORIRES",
            error

    })
    }

}
export const singleCategoryController=async(req,res)=>{
    try{
       // const {id} =req.params
       //const  category =await categoryModel.findById({_id:id})
       const category=await categoryModel.findOne({slug:req.params.slug})
       if(category){
        res.status(200).send({
            success:true,
            massage:"category",
            category
        })
       }else{
        res.status(400).send({
            success:false,
            massage:"category not found"
        })
       }

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            massage:"Error white gettting category",
            error
        })
    }

}
export const deleteCategoryController=async (req,res)=>{
    try{
        const {id}=req.params
        await categoryModel.findOneAndDelete(id);
        res.status(200).send({
            success:true,
            massage:"category deleted successfully"
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            massage:"Error while deleting category",
            error
        })

    }
}

