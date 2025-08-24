import React from 'react'
import service from '../appwrite/configration'
import {Link} from "react-router-dom"
import Post from '../pages/post'
function PostCard(post) {  
    
    // const handlepost = ()=>{
    //     <Post post={post}/>
    // }
    
    return (
        <>
        <div>
            <Link to={`/post`} state={{post : post}} >
                <div className='w-[350px] h-[450px] rounded-2xl overflow-hidden bg-white gap-5'>
                    <img src={service.getFilePreview(post.post.featuredImage)} alt={post.post.title} 
                    className='p-5 w-[400px] h-[400px] object-cover'
                    />
                    <h1 className='font-bold px-5'>
                        {post.post.title}
                    </h1>
                    <div 
                    
                    className='px-5'
                    dangerouslySetInnerHTML={{ __html: post.post.content }} />
                    
                    {/* <p>{post.post.content}</p> */}
                </div>
            </Link>
        </div>
            
        </>
    )
}

export default PostCard
