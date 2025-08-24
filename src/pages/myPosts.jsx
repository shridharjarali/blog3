import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import service from '../appwrite/configration'
import PostCard from '../components/postCard'
import { useNavigate } from 'react-router-dom'
function MyPosts() {
    const navigate = useNavigate()
    const [myPosts,setMyPosts] = useState([])
    const [loader,setLoader] = useState(true)
    const userdata = useSelector((state)=>state.userData)
    console.log(userdata);
    
    
    useEffect(()=>{
        if (userdata?.$id) {            
            service.getMyPosts(userdata?.$id)
            .then((posts)=>{
            if (posts) {   
                setMyPosts(posts.documents)
            }
            })
            .finally(() => {
                setLoader(false)   // ✅ only after request is done
            })
        }
        else{
            service.getMyPosts(userdata.userData?.$id)
            .then((posts)=>{
            if (posts) {   
                setMyPosts(posts.documents)
            }
            })
            .finally(() => {
                setLoader(false)   // ✅ only after request is done
            })
        }
        
    },[]) 
    console.log(myPosts);

    const handlecreatePost = ()=>{
        navigate('/addPost')
    }
    
    return (
        <>
            {loader ? (<div className="flex justify-center h-screen">
                        <div className="w-10 h-10 border-4 border-white border-dashed rounded-full animate-spin" style={{ animationDuration: "2s" }}></div>
                        <p className="ml-3 text-lg">Loading...</p>
                        </div>
            ) : (
                <>
                    {
                        myPosts?.length === 0 ? (
                            <>
                                 <div className='flex flex-col justify-center items-center h-[400px] gap-5'>
                                    <h1 className='text-2xl font-bold text-white'>You have not created any post yet</h1>
                                    <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                                        onClick={handlecreatePost}>
                                        Add post
                                    </button>
                                </div>
                            </>
                            
                        ) : (
                            <>
                                <div className='w-full h-auto flex flex-wrap justify-center gap-5 flex-row items-center'>
                                {
                                    myPosts?.map((post)=>(
                                        
                                        <div key={post.title}>
                                            <PostCard post={post}/>
                                        </div>
                                    ))
                                }
                            </div>
                            </>
                            

                        )
                    
                    }
                </>
                
            )}
            
            
        </>
    )
}

export default MyPosts
