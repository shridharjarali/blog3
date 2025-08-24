import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import authServise from '../appwrite/auth'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login as storeLogin } from '../store/appwriteSlice'

function SignUp() {
    const navigate = useNavigate()
    const {register,handleSubmit} = useForm()
    const [error,setError] = useState()
    const dispatch = useDispatch()

    const create = async (data)=>{
        setError("")
            try {
                const userData = await authServise.createAccount(data)
               
                if (userData) {
                    const userData = await authServise.getCurrentUser()
                    if (userData) {
                        dispatch(storeLogin(userData))
                    }
                    navigate("/login")
                }
            } catch (error) {
                throw error
                setError(error)
            }
    }

    return (
        <>
        <div className='flex justify-center'>
            
            <div className='bg-white w-[400px] h-auto flex justify-center rounded-2xl flex-col'>
                {error && 
                    <p className='w-[350px] text-center bg-red-400 rounded-2xl shadow-black px-5'>
                        {error}
                    </p>
                }
                <p className='mt-5 text-center'>Create account</p>
                <form action="" onSubmit={handleSubmit(create)}
                className='flex flex-col justify-center p-10 text-black gap-y-5'
                >
                    <div className='flex gap-5 justify-center  border rounded-[5px]'>
                        <label htmlFor="name">Name</label>
                        <input type="text" 
                            id = "name"
                            className='focus:outline-none focus:ring-0'
                            placeholder='enter name'
                            {
                                ...register("name",{
                                    required : true,
                                })
                            }
                        />
                    </div>
                    <div className='flex gap-5 justify-center  border rounded-[5px]'>
                        <label htmlFor="SignEmail">Email</label>
                        <input type="email" 
                            id = "SignEmail"
                            className='focus:outline-none focus:ring-0'
                            placeholder='enter your email'
                            {
                                ...register("email",{
                                    required : true,
                                    validate : {
                                        matchpattern : (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/. test(value) || "email is not valid"


                                    }
                                })
                            }
                        />
                    </div>
                    

                    <div className='flex gap-5 justify-center  border rounded-[5px]'>
                        <label htmlFor="SignPassword">Password</label>
                        <input type="password" 
                        id ="SignPassword"
                        className='focus:outline-none focus:ring-0'
                        placeholder='Enter Password'
                        {
                            ...register("password",{
                                required : true,
                                // validate : {
                                //     matchpattern : (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/. test(value) || "week password"
                                // }
                            })
                        }
                        />
                    </div>
                    
                    <button type='submit' 
                    className='text-white bg-blue-600 rounded-xl p-2.5 hover:bg-blue-700 hover:cursor-pointer'>
                        sign up
                    </button>
                    <Link to={"/login"}
                    className='text-blue-500 text-center'
                    >
                     already have an account
                    </Link>
                </form>
            </div>    
        </div>
        </>
    )
}

export default SignUp