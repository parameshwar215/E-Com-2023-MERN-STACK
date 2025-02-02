import React ,{useState} from 'react'
import Layout from '../../Layout/Layout';
import '../../style/AuthStyles.css';

import axios from 'axios';
import {useNavigate} from "react-router-dom"
import toast from 'react-hot-toast';
function Register() {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [phone,setPhone]=useState("")
  const [address,setAddress]=useState("")
  const [password,setPasssword]=useState("")
  const [answer,setAnswer]=useState("")
  const navigate=useNavigate()

  const handleSubmit=async (e)=>{
    e.preventDefault()
    try{
      const res=await axios.post(`api/v1/auth/register`,{name,email,password,address,phone,answer});
    if(res && res.data.success){
      toast.success(res.data && res.data.massage);
       navigate('/login');
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
          <h1 className='title'>Register Form</h1>
          <div className="mb-3">
        
              <input type="text" className="form-control" id="name" 
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder='Enter your name'
              required
             />
            </div>
            <div className="mb-3">
              <input type="email" className="form-control" id="email" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                placeholder='Enter your email'aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" id="phone"
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
                 placeholder='Enter your phone number'aria-describedby="emailHelp"
                 required
                 />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" id="address" 
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
                placeholder='Enter your Address' aria-describedby="emailHelp"
                required
                />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" 
                value={password}
                onChange={(e)=>setPasssword(e.target.value)}
                placeholder='Enter your password'id="password"
                required
                />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" 
                value={answer}
                onChange={(e)=>setAnswer(e.target.value)}
                placeholder='Enter your Favourate Sport Name'id="password"
                required
                />
            </div>
            
            <button type="submit" className="btn btn-primary">Register</button>
          </form>

        </div>
      </Layout>

    </>
  )
}

export default Register;
