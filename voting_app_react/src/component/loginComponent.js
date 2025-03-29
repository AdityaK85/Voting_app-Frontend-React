import React , { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { VotingAPI } from '../API_endpoints/API'

export const LoginComponent = ({setIsLogin}) => {

    const [voterID, setVoterID] = useState('')
    const [password, setPassword] = useState('')
    const navingate = useNavigate();


    const loginHandler = async function() {
        if (voterID == '')  toast.error('Please enter your valid voter ID')
        else if (password == '')  toast.error('Please enter your password')
        else {
            var data = {
                'voter_id' :  voterID,
                'password' : password
            }
            var response = await VotingAPI.login_api(data)
            if (response.status === 200 && response.data.status === 200 ) {
                console.log(response.data.api_token.access)
                if (response.data.user_type == 'VOTER_USER') navingate('/votings')
                else navingate('/admin-dashboard' )
                localStorage.setItem('accessToken', response.data.api_token.access)
                localStorage.setItem('logged_user_id', response.data.user_id)
            } 
            else  toast.error(response.data.msg)
        }
    }

  return (
        <div className="auth-container" id="loginForm">
            <h2>Official E-Voting Portal</h2>
            <div className="security-badge">
                <p>Secure E-voting Portal - Encrypted Connection</p>
            </div>
            {/* <form  > */}
                <div className="form-group">
                    <input type="text" onInput={(e)=>setVoterID(e.target.value)} placeholder="Enter your voter ID"  />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Enter your password" onInput={(e)=>setPassword(e.target.value)}  />
                </div>
                <button onClick={loginHandler} className="btn">Secure Sign In</button>
                <p style={{textAlign:'center' , marginTop:'20px'}}> Need an account? <a role='button' onClick={()=>{setIsLogin(false)}}>Register Here</a>
                </p>
            {/* </form> */}
            <ToastContainer /> 
        </div>
  )
}
