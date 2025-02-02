import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import '../../style/AuthStyles.css';

import axios from 'axios';

import toast from 'react-hot-toast';

function ForgotPassword() {
    

  const [email,setEmail]=useState("")
  const [answer,setAnswer]=useState("")
  const [newPassword,setNewPasssword]=useState("")
  const navigate=useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const res=await axios.post(`api/v1/auth/forgot`,{email,newPassword,answer});
    if(res && res.data.success){
      toast.success(res.data && res.data.massage);
      
       navigate( '/login');
    }else{
      toast.error(res.data.massage)
    }
    }catch(error){
      console.log(error)
      toast.error("Somthing went wrong")
    }


  }
  
  return (
    <>
      <Layout title="forgot-password">
        <div className='form-container'>
        
          <form onSubmit={handleSubmit}>
          <h1 className='title'>Reset Password</h1>
         
            <div className="mb-3">
              <input type="email" className="form-control" id="email" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                placeholder='Enter your email'aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" id="email" 
                value={answer}
                onChange={(e)=>setAnswer(e.target.value)}
                required
                placeholder='Enter your favourate sport'aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" 
                value={newPassword}
                onChange={(e)=>setNewPasssword(e.target.value)}
                placeholder='Enter your New password'id="password"
                required
                />
            </div>
            
            <button type="submit" className="btn btn-primary">Reset Password</button>
            

          </form>

        </div>
      </Layout>

    </>
  )
}

export default ForgotPassword
