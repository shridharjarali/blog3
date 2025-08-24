import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import LogoutBtn from './logoutBtn'
import { store } from '../store/store'
import { useEffect } from 'react';

function Header() {
    // console.log("in header");
        
    const authStatus = useSelector((state)=> state.status)
    // console.log(authStatus);
    const userdata = useSelector((state)=>state.userData)
    
    const navigate = useNavigate()

    useEffect(() => {
        if (!authStatus) {
            navigate("/login")   // 🚀 redirect to login when not logged in
        } else {
            navigate("/")        // 🚀 go home when logged in
        }
    }, [])

    const navItems = [
        {
            name : 'Home',
            url : "/",
            active : authStatus
        },
        {
            name : 'Login',
            url : "/login",
            active : !authStatus
        },
        {
            name : 'Signup',
            url : "/signup",
            active : !authStatus
        }
        ,
        {
            name : 'All post',
            url : "/allPost",
            active : authStatus
        },
        {
            name : 'Add post',
            url : "/addPost",
            active : authStatus
        },
        {
            name : 'MyPosts',
            url : "/myPost",
            active : authStatus
        }
    ]
    return (
        <>
        <div className='bg-white w-full mb-10 h-10 flex items-center sticky top-0'>
            <ul className='flex flex-row gap-x-5 px-5 justify-between items-center'>
                {navItems.map((item)=>(
                    item.active ? (
                        <li key={item.name}>
                            <button onClick={()=>navigate(item.url)} className='cursor-pointer'>
                                {item.name}
                            </button>
                        </li>
                    ) : null
                ))}
                <div className='flex justify-center items-center absolute right-0 p-5'>
                    {authStatus && (
                        <li  className='cursor-pointer'>
                            <LogoutBtn/>
                        </li>
                    )}
                    {
                        authStatus && 
                        <h1
                        className='text-black flex justify-end font-extrabold flex-end text-2xl ml-5 '
                        >@{userdata?.name ? (userdata?.name) : (userdata?.userData?.name)}</h1>
                    }
                </div>
            </ul>
        </div>
        </>
    )
}

export default Header
