import React, { useState } from 'react'
import { useNavigate,useLocation ,Link} from 'react-router-dom';
import Layout from '../../Layout/Layout';
import '../../style/AuthStyles.css';
import { useAuth } from '../../../context/auth';
import axios from 'axios';

import toast from 'react-hot-toast';

function Login() {
    const [auth,setAuth]=useAuth()

  const [email,setEmail]=useState("")
  const [password,setPasssword]=useState("")
  const navigate=useNavigate()
  const location=useLocation()
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const res=await axios.post(`api/v1/auth/login`,{email,password});
    if(res && res.data.success){
      toast.success(res.data && res.data.massage);
      setAuth({
        ...auth,
        user:res.data.user,
        token:res.data.token
      })
      localStorage.setItem("auth",JSON.stringify(res.data))
       navigate(location.state || '/');
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
      <Layout title="register">
        <div className='form-container'>
        
          <form onSubmit={handleSubmit}>
          <h1 className='title'>Login Form</h1>
         
            <div className="mb-3">
              <input type="email" className="form-control" id="email" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                placeholder='Enter your email'aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" 
                value={password}
                onChange={(e)=>setPasssword(e.target.value)}
                placeholder='Enter your password'id="password"
                required
                />
            </div>
            
            <button type="submit" className="btn btn-primary">Login</button>
            <button type="submit" className="btn btn-primary" onClick={()=>navigate("/forgot")}>
               Forgot password</button>

          </form>

        </div>
      </Layout>

    </>
  )
}

export default Login
