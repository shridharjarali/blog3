import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import service from '../appwrite/configration';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PostForm from '../components/postForm';
import EditPost from './editPost';

function Post() {
    const location = useLocation();
  const {post } = location.state || {};
      const userdata = useSelector((state)=>state.userData)
      const navigate = useNavigate()

//   console.log(post);

  const handleDelete = ()=>{
        service.deletePost(post.post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.post.featuredImage);
                navigate("/myPost");
            }
        });
  }

  const handleEdit = ()=>{
        navigate("/editpost", {
      state: {post}
    })
    
    // <PostForm post={post}/>
    // <EditPost/>

  }
  
    return (
        <>
        {/* <h1
        className='text-white flex font-extrabold flex-end text-2xl ml-10'
        >@{userdata?.name ? (userdata?.name) : (userdata?.userData?.name)}</h1> */}
        <div className='flex flex-row bg-white m-20 justify-between'>
            <div className='flex flex-row'>
                    <div className='p-5'>
                    <img src={service.getFilePreview(post.post.featuredImage)} alt={post.post.title} 
                    className=' w-[400px] h-[400px] object-cover border'
                    />
                    <h1 className='font-bold'>
                        {post.post.title}
                    </h1>
                </div>
                <div>
                    <div dangerouslySetInnerHTML={{ __html: post.post.content }} 
                    className='mt-5'
                    />
                </div>
            </div>
            
            <div className='m-5'>
                {
                    userdata?.$id ? (
                        post.post.userId == userdata?.$id ? (
                            <div>
                                <button className='mb-2.5 hover:cursor-pointer' onClick={handleEdit}>
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button className='mb-2.5 hover:cursor-pointer' onClick={handleDelete}>
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        ) : (null)
                    ) : (
                        post.post.userId == userdata?.userData?.$id ? (
                            <div className='flex flex-row gap-5'>
                                <button className='mb-2.5 hover:cursor-pointer' onClick={handleEdit}>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button className='mb-2.5 hover:cursor-pointer' onClick={handleDelete}>
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        ) : (null)
                    )
                    
                }
            </div>
        </div>
        </>
    )
}

export default Post
