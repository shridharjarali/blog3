import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import service from '../appwrite/configration'
import PostForm from '../components/postForm'
import { useLocation } from 'react-router-dom'
function EditPost() {
    // const [post,setPosts] = useState(null)
    // const {slug} = useParams()
    // const navigate = useNavigate()
        const location = useLocation();
  const {post } = location.state || {};

    // useEffect(()=>{
    //     if (slug) {
    //         service.getPost(slug)
    //         .then((post)=>{
    //             if (post) {
    //                 setPosts(post)
    //             }
    //         })
    //     }else{
    //         navigate('/')
    //     }
    // },[slug,navigate])
    return post ? (
        <div>
            <PostForm post={post}/>
        </div>
    ) : null
}

export default EditPost
