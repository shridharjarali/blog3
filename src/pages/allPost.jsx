import React, { useEffect } from 'react'
import { useState } from 'react'
import service from '../appwrite/configration'
import PostCard from '../components/postCard'

function AllPost() {
    const [posts,setPosts] = useState([])
    const [loader,setLoader] = useState(true)
    useEffect(()=>{
        service.getPosts([])
        .then((posts)=>{
        if (posts) {   
            setPosts(posts.documents)
        }
    })
    .finally(() => {
        setLoader(false)   // ✅ only after request is done
      })
    },[]) 
    
    
    return (
        <>
            {loader ? (<div className="flex justify-center h-screen">
                        <div className="w-10 h-10 border-4 border-white border-dashed rounded-full animate-spin" style={{ animationDuration: "2s" }}></div>
                        <p className="ml-3 text-lg">Loading...</p>
                        </div>
            ) : (

                <div className='w-full h-auto flex flex-wrap justify-center gap-5 flex-row items-center px-10'>
                {
                    posts?.map((post)=>(
                        
                        <div key={post.title}>
                            <PostCard post={post}/>
                        </div>
                    ))
                }
            </div>
            )}
            
            
        </>
    )
}

export default AllPost
