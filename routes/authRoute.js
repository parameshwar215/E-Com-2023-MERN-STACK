import express from 'express'
import {registerController,loginController,testController, forgotPasswordController} from '../controllers/authController.js'
import {requireSignIn,isAdmin, isUser} from '../middleware/authMiddleware.js'
const router=express.Router()

router.post('/register',registerController)

router.post('/login',loginController)

router.get('/get',requireSignIn,isAdmin,testController)


//protected route auth
router.get('/user-auth',requireSignIn,isUser,(req,res)=>{
    res.status(200).send({
        ok:true
})

})
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({
        ok:true
})

})

//forgotpassword
router.post('/forgot',forgotPasswordController)

export default router;