import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import authServise from '../appwrite/auth'
import { useDispatch, useSelector } from 'react-redux'
import {login as storeLogin} from '../store/appwriteSlice'
import {useForm} from "react-hook-form"
import { Link } from 'react-router-dom';

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register,handleSubmit} = useForm()
    const [error,setError] = useState()
    

    const login = async (data)=>{
        setError("")
        try {
            const session = await authServise.login(data)
            if (session) {
                const userData = await authServise.getCurrentUser()
                if (userData) {
                    dispatch(storeLogin(userData))
                    navigate("/")
                }
                
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <> 
            <div className=' flex justify-center items-center mb-5'>
                {error && 
                    <p className='w-[350px] text-center bg-red-400 rounded-2xl shadow-black px-5'>
                        {error}
                    </p>
                }
            </div>
            
            <div className='flex justify-center h-[378px] items-center '>
                
                <div className='bg-white w-[400px] h-[300px] flex justify-center rounded-2xl flex-col'>
                    
                   
                    <form action="" onSubmit={handleSubmit(login)} 
                    className='flex flex-col justify-center p-10 text-black gap-y-10'
                    >

                        <div className='flex gap-5 justify-center border rounded-[5px]'>
                            <label htmlFor="email">Email</label>
                            <input type="email" 
                                id = "email"
                                className='focus:outline-none focus:ring-0'
                                placeholder='enter the your email'
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
                        

                        <div className='flex gap-5 justify-center border rounded-[5px]'>
                            <label htmlFor="Password">Password</label>
                            <input type="password" 
                            id ="Password "
                            className='focus:outline-none focus:ring-0 '
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
                        className='text-white bg-blue-600 rounded-xl p-2.5  hover:bg-blue-700 hover:cursor-pointer'>
                            Login
                        </button>
                    </form>
                    <Link to={"/signUp"}
                    className='text-blue-500 mb-5 text-center'
                    >
                     create account
                    </Link>
                    
                </div>
            </div>
        </>
    )
}

export default Login
