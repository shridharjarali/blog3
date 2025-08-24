import React, { useEffect, useState } from 'react'
import { authSlice } from '../store/appwriteSlice'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AuthenticationCheck({children, authentication = true}) {
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.status)
    const [loader,setLoader] = useState(true)

    useEffect(()=>{
                
        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    },[authStatus, navigate, authentication])
    return loader ? <h1>loading....</h1> : <>{children}</>
}

export default AuthenticationCheck
