import React from 'react'
import {useDispatch} from 'react-redux'
import authServise from '../appwrite/auth'
import { logout } from '../store/appwriteSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const handler = ()=>{
        authServise.logout()
        .then(()=>{
            dispatch(logout())
        })
    }
    return (
        <>
            <button onClick={handler} className='bg-red-500 py-1 px-5 rounded-2xl hover:bg-red-600 hover:cursor-pointer text-white'>
                logout
            </button>
        </>
    )
}

export default LogoutBtn