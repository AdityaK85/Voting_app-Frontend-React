import React , { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VotingAPI } from '../API_endpoints/API'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const SingupComponent = ({setIsLogin}) => {
    const navigate = useNavigate();
    const [Fullname, setFullname] = useState('')
    const [IdNumber, setIdNumber] = useState('')
    const [Email, setEmail] = useState('')
    const [Constituency, setConstituency] = useState('')
    const [Phonenumber, setPhonenumber] = useState('')
    const [Address, setAddress] = useState('')
    const [City, setCity] = useState('')
    const [State, setState] = useState('')
    const [Zipcode, setZipcode] = useState('')
    const [Nationality, setNationality] = useState('')
    const [Dob, setDob] = useState('')
    const [Gender, setGender] = useState('')

    const signupHandler = async function() {
        var emailfilter = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
        if (Fullname == '')  toast.error('Please enter your legal full name')
        else if (IdNumber == '')  toast.error('Please enter your goverment ID number')
        else if (Email == '')  toast.error('Please enter your registered email address')
        else if (!emailfilter.test(Email)) toast.error('Please enter valid email address')
        else if (Constituency == '')  toast.error('Please enter your constituency')
        else if (Phonenumber == '')  toast.error('Please enter your phone number')
        else if (Phonenumber.length < 10 )  toast.error('Please enter 10 digit phone number')
        else if (Address == '')  toast.error('Please enter your address')
        else if (City == '')  toast.error('Please enter your city')
        else if (State == '')  toast.error('Please enter your state')
        else if (Zipcode == '')  toast.error('Please enter your zipcode')
        else if (Nationality == '')  toast.error('Please enter your nationality')
        else if (Dob == '')  toast.error('Please enter your Date of Birth')
        else if (Gender == '')  toast.error('Please select the gender')
        else {
            var data = {
                'full_name' : Fullname,
                'goverment_id' : IdNumber,
                'email' : Email,
                'constituency' : Constituency,
                'phone_no' : Phonenumber,
                'address' : Address,
                'nationality' : Nationality,
                'city' : City,
                'state' : State,
                'postal_code' : Zipcode,
                'dob' : Dob,
                'gender' : Gender
            }
            var response = await VotingAPI.signup_api(data);
            if(response.data.status == 200) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Registration successful! Your login credentials will be sent to your email address.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => { 
                    setIsLogin(true)
                });
            }
            else {
                toast.error(response.data.msg)
            }
        }
    }

  return (
    <div className="auth-container" id="registerForm" style={{maxWidth:'100%'}} >
            <h2>Official Registration</h2>
            <div className="security-badge">
                <p>Verified Registration Portal</p>
            </div>
            <form >
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <input type="text" id="full_name" name="fullName" onInput={(e)=>{setFullname(e.target.value)}}  placeholder="Full Legal Name" />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <input type="text" id="idNumber" name="idNumber" onInput={(e)=>{setIdNumber(e.target.value)}}  placeholder="Government ID Number (e.g., Aadhar, SSN)" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <input type="email" id="email" name="email" onInput={(e)=>{setEmail(e.target.value)}}   placeholder="Official Email Address" />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <input type="text" id="constituency" name="constituency" onInput={(e)=>{setConstituency(e.target.value)}}   placeholder="Constituency" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <input type="text" id="phoneNumber" name="phoneNumber" onInput={(e)=>{setPhonenumber(e.target.value)}}  placeholder="Phone Number (with country code)" />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <input type="text" id="address" name="address" onInput={(e)=>{setAddress(e.target.value)}}  placeholder="Residential Address" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <input type="text" id="city" name="city" onInput={(e)=>{setCity(e.target.value)}}  placeholder="City" />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <input type="text" id="state" name="state" onInput={(e)=>{setState(e.target.value)}}  placeholder="State/Province" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <input type="text" id="zipcode" name="zipcode" onInput={(e)=>{setZipcode(e.target.value)}}  placeholder="ZIP/Postal Code" />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <input type="text" id="nationality" name="nationality" onInput={(e)=>{setNationality(e.target.value)}}  placeholder="Nationality" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <input type="date" id="dob" name="dob" onInput={(e)=>{setDob(e.target.value)}}  placeholder="Date of Birth" />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <select name="gender" id="gender" onInput={(e)=>{setGender(e.target.value)}}  >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <button type="button" onClick={signupHandler} className="btn">Register Account</button>
                    </div>
                </div>
                <p style={{textAlign:'center' , marginTop:'20px'}}>
                    Already registered? <a  role='button'  onClick={()=>{setIsLogin(true)}}>Sign In</a>
                </p>
            </form>
            <ToastContainer />
        </div>
  )
}
