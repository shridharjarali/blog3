import React, { useEffect, useState } from 'react'
import service from '../appwrite/configration'
import PostCard from '../components/postCard'
import { useSelector } from 'react-redux'


function Home() {
    const [posts,setPosts] = useState([])
    const [loader,setLoader] = useState(true)
    const authStatus = useSelector((state)=> state.status)
    const userdata = useSelector((state)=>state.userData)
    
    useEffect(()=>{
        
        service.getPosts()
        .then((posts)=>{
            if (posts) {
                setPosts(posts.documents)
            }
        })
        .finally(() => {
        setLoader(false)   // ✅ only after request is done
      })

    },[posts])
    
    
    
    if (posts.total === 0) { 
        return (
            <>
                <div>
                    <h1>
                        {/* Login to read posts */}
                    </h1>
                </div>
            </>
        )
    }
    return(
        <>
        {
            authStatus ? (

                
                    loader ? (
                        <div className="flex justify-center h-screen">
                            <div className="w-10 h-10 border-4 border-white border-dashed rounded-full animate-spin" style={{ animationDuration: "2s" }}></div>
                            <p className="ml-3 text-lg">Loading...</p>
                        </div>
                    ) : (
                        <>
                        {/* <h1
                        className='text-white flex font-extrabold flex-end text-2xl ml-10'
                        >@{userdata?.name ? (userdata?.name) : (userdata?.userData?.name)}</h1> */}
                        <div className='flex flex-col justify-center items-center'>
                            <div className='mb-10'>
                                <p
                                className='font-extrabold text-4xl text-white'
                                >Welcome to Blog App</p>
                                <p
                                className='text-white'
                                >– a place where ideas come alive</p>
                            </div>
                            
                            <p
                            className='text-white text-xl mb-10'
                            >Explore inspiring stories, learn from diverse voices, 
                            <br />and stay updated with the latest trends. 
                            <br />Whether you want to read, write, or share your own journey, 
                            <br />this is your community to connect, create, and inspire.
                            </p>
                            <div className='w-[80vw] h-auto flex flex-wrap justify-center gap-5 flex-row'>
                                {posts.map((post)=>(
                                    <div key={post.title}>
                                        <PostCard post={post}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                            
                        </>
                        
                    )
                

            ) : (

                <>
                
                        <div className='flex flex-col justify-center items-center h-[400px]'>
                            <div className='mb-10'>
                                <p
                                className='font-extrabold text-4xl text-white'
                                >Welcome to Blog App</p>
                                <p
                                className='text-white'
                                >– a place where ideas come alive</p>
                            </div>
                            
                            <p
                            className='text-white text-xl mb-10 text-center'
                            >Explore inspiring stories, learn from diverse voices, 
                            <br />and stay updated with the latest trends. 
                            <br />Whether you want to read, write, or share your own journey, 
                            <br />this is your community to connect, create, and inspire.
                            </p>
                        </div>
                            
                        </>

            )
        }
        
           
        </>
    )
}

export default Home
