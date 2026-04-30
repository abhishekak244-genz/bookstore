import React, { useState } from 'react'
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useFormik } from "formik";
import * as Yup from 'yup'
import { loginAPI, registerAPI, googleLoginAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

function Auth({insideRegister}) {
  const navigate =useNavigate()
  const[togglePassWordType,setTogglePasswordType] = useState(false)
  //function for formik
  const formik = useFormik({
    initialValues:{
      username:"UserName",
      email:"",
      password:""
    },
    validationSchema: Yup.object({
      username:Yup.string().min(3,"Must be atleast 3 charecters").required("Username Required"),
      email:Yup.string().email("Invalid email").required("Email Required"),
      password:Yup.string().required("Password Required")
    }),
    // we use resetform object for empty the inputs
    onSubmit:(values,{resetForm})=>{
      console.log(values);
      if(insideRegister){
        console.log("register API call");
        handleRegister(values)
      }else{
        console.log("Login api call");
        handleLogin(values)
      }
      resetForm()
    }
  })
  //function for api call register 
  const handleRegister = async(userData)=>{
    const result = await registerAPI(userData)
    console.log(result);
    if(result.status==201){
      toast.success("Succesfully Registerd.... Please Login")
    }else{
      toast.error(result.response)
    }
    navigate('/login')

  }

  //function for api call login

  const handleLogin = async (userData)=>{
    const result = await loginAPI(userData)
    console.log(result);
    if(result.status==200){
      toast.success("Login Successfull..")
      sessionStorage.setItem("token",result.data.token)
      sessionStorage.setItem("user",JSON.stringify(result.data.user))
      setTimeout(() => {
        if(result.data.user.role =="admin"){
          navigate('/admin')
        }else{
          navigate('/')
        }
      }, 2500);
    }else{
      toast.error(result.response)
    }
    
  }
  // function for google authontication
  const handleGoogleLogin = async (credentialResponse)=>{
   console.log('inside handleGoogleLogin');
   console.log(credentialResponse);
   const {email,name,picture} = jwtDecode(credentialResponse.credential)
   console.log(email,name,picture);
  //  api call
   const result = await googleLoginAPI ({userName:name,email,password:"googlePawword",picture})
   if(result.status==200){
      toast.success("Login Successfull..")
      sessionStorage.setItem("token",result.data.token)
      sessionStorage.setItem("user",JSON.stringify(result.data.user))
      setTimeout(() => {
        if(result.data.user.role =="admin"){
          navigate('/admin')
        }else{
          navigate('/')
        }
      }, 2500);
    }
   
   
  }



  return (
    <div>
      <div className='w-full min-h-screen flex justify-center items-center bg-[url(/landing.png)] bg-cover bg-center text-white'>
        <div className='p-10'>
          <h1 className="text-center font-bold text-3xl">BOOK STORE</h1>
          <div style={{width:'400px'}} className="bg-black text-white p-5 flex justify-center items-center flex-col my-5">
            <div style={{width:'80px',height:'80px',borderRadius:'50%'}} className='border mb-5 flex justify-center items-center'>
              <FaUser className='text-3xl'/>
            </div>
            <h1 className='text-2xl'>{insideRegister?"Register":"Login"}</h1>
            <form onSubmit={formik.handleSubmit} className="my-5 w-full">
              {/* userName */}
              {insideRegister && 
              <>
              <input name='username' value={formik.values.username} onChange={formik.handleChange} className='bg-white p-2 w-full rounded my-5 text-black' type="text" placeholder='Username' />
              <div className="mb-3 text-xs text-yellow-400">{formik.errors.username}</div>
              </>
              }
              {/* email */}
              <input name='email' value={formik.values.email} onChange={formik.handleChange} 
               className='bg-white p-2 w-full rounded mb-5 text-black' type="text" placeholder='E mail' />
              <div className="mb-3 text-xs text-yellow-400">{formik.errors.email}</div>
              {/* passWord */}
              <div className='flex items-center'>
                <input name='password' value={formik.values.password} onChange={formik.handleChange}
                 className='bg-white p-2 w-full rounded mb-5 text-black' type={togglePassWordType?"text":"password"} placeholder='Password' />
                { togglePassWordType?
                  <FaEyeSlash onClick={()=>setTogglePasswordType(!togglePassWordType)}  className='text-gray-500 cursor-pointer' style={{marginTop:'-20px',marginLeft:'-30px'}} />
                :
                <FaEye onClick={()=>setTogglePasswordType(!togglePassWordType)} className='text-gray-500 cursor-pointer' style={{marginTop:'-20px',marginLeft:'-30px'}} />
                }
              </div>
              <div className="mb-3 text-xs text-yellow-400">{formik.errors.password}</div>
              {/* forgot password */}
              <div className='flex justify-between mb-5'>
                  <p className='text-xs text-orange-300'>*Never share your password with others</p>
                  {!insideRegister &&
                    <button className="text-xs underline">Forgot password</button>
                  }
              </div>
              {/* login/register btn */}
              <div className='text-center'>
                       {
                        insideRegister?
                        <button type='submit' className="bg-green-700 p-2 w-full rounded">Register</button>
                        :
                        <button type='submit' className="bg-green-700 p-2 w-full rounded">Login</button>

                       }
              </div>
              {/* google authontication */}
              <div className="my-5 text-center">
                <p>------------------or---------------------</p>
                <div className="mt-2 flex justify-center items-center w-full">
                 <GoogleLogin
                    onSuccess={credentialResponse => {
              handleGoogleLogin(credentialResponse);
                              }}
                     onError={() => {
              console.log('Login Failed');
                        }}
                   />;
                </div>
                
              </div>
              {/* new/already existed user */}
              <div className='text-center my-5'>
              {
                insideRegister?
                <p className='text-blue-500'>Existing User? <Link to={'/login'} className='underline ms-5' >Login</Link></p>
                :
                <p className='text-blue-500'>New User? <Link to={'/register'} className='underline ms-5' > Register</Link></p>
              }
              </div>
            </form>
          </div>
        </div>
        {/* toast */}
        <ToastContainer position='top-center' theme='colored' autoClose={3000} />
      </div>
    </div>
  )
}

export default Auth