import React, { useEffect, useState } from 'react'
import { useNavigate,useLocation } from 'react-router';
function Spinner() {
    const [count,setCount]=useState(5);
    const navigate=useNavigate();
    const location=useLocation()
    useEffect(()=>{
        const interval=setInterval(()=>{
            setCount((prev)=> --prev)
        },1000)
        count===-1 && navigate('/login',{
            state:location.pathname
        });
        return ()=> clearInterval(interval)
    },[count,navigate,location])

    return (
        <>
             <div className="d-flex flex-column justify-content-center align-items-center"
             style={{height:"100vh"}}
             
             >
                <h1 className="Text-center">redirecting to you in {count} second</h1>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
           

        </>
    )
}

export default Spinner
