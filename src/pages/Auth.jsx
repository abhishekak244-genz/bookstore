import React, { useState } from 'react'
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa'

function Auth({insideRegister}) {
  const [togglePasswordType, setTooglePasswordType] = useState(false)
  return (
    <div className='w-full min-h-screen flex justify-center items-center bg-[url(/landing.png)] bg-cover bg-center text-white'>
      <div className='p-10'>
        <h1 className='text-center font-bold text-3xl'> book store</h1>
        <div style={{width:'400px'}} className='bg-black text-white p-5 flex justify-center items-center flex-col my-5'>
          <div style={{width:'80px' , height:'80px' , borderRadius:'50%'}} className='boredr mb-5 flex justify-center items-center flex-col my-5'>
           <FaUser className='text-3xl'/>
          </div>
          <h1 className='text-2xl '> { insideRegister? "register":"login"}</h1>
          <form className='my-5 w-full'>
               {/* username*/}
               {
                insideRegister&& 
                <input className='bg-white p-2 w-full rounded my-5 text-black' type="text"  placeholder='username'/>
               }
               {/* email*/}
            <input className='bg-white p-2 w-full rounded my-5 text-black' type="text"  placeholder='email'/>
               {/* password*/}
               <div className='flex items-center'>
                <input className='bg-white p-2 w-full rounded my-5 text-black' type={togglePasswordType?"text":"password"}  placeholder='password'/>
                {
                  togglePasswordType?
                  <FaEyeSlash  onClick={()=>setTooglePasswordType(!togglePasswordType)} className='text-gray-600 cursor-pointer' style={{marginTop:'-20px', marginLeft:'-30px'}}/>
                  :
                  <FaEye onClick={()=>setTooglePasswordType(!togglePasswordType)} className='text-gray-600 cursor-pointer' style={{marginTop:'-20px', marginLeft:'-30px'}}/>
                }
               </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Auth