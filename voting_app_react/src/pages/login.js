import React , { useState, useEffect } from 'react'
import { LoginComponent } from '../component/loginComponent'
import { SingupComponent } from '../component/signupComponent'
import { useNavigate } from 'react-router-dom'

export const Login = () => {

    const [isLogin, setIsLogin] = useState(true)

  return (
    <>
    <div className="container">
        {isLogin ? <LoginComponent setIsLogin={setIsLogin} /> : <SingupComponent setIsLogin={setIsLogin} /> }
    </div>  
    </>

  )
}


export const RedirectLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, [navigate]);

  return null; 
};