import express from 'express'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import {categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController} from '../controllers/CategoryController.js'


const router=express.Router()
//create categry
router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

//update category
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

//get all category
router.get('/getAll-category',categoryController)

//sing category
router.get('/get-category/:slug',singleCategoryController)

 //delete category
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)

export default router;