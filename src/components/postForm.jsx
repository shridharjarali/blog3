import React, { useCallback, useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import service from '../appwrite/configration'
import RTE from './RTE'
import SelectBtn from './selectBtn'
import Input from './input'
import { useLocation } from 'react-router-dom'

function PostForm({post}) {
    console.log("in postform");

        const navigate = useNavigate()
    const userdata = useSelector((state)=>state.userData)
    // console.log(userdata);
    
    // console.log(userdata.userData);
    
    const {register,handleSubmit,watch,setValue,control,getValues} = useForm(
        {
            defaultValues :{
                title : post?.post?.title || '',
                slug : post?.post?.slug || '',
                content : post?.post?.content || '',
                status : post?.post?.status || 'active', 
            }
        }
    )

    const submit = async (data) => {

        // console.log("in postform");
        
        // console.log(userdata.userData?.$id);

        
        if(post)
        {
            const file = data.image[0] ? service.uploadFile(data.image[0]) : null

            if (file) {
                service.deleteFile(post.featuredImage)
            }

            const dbpost = await service.updatePost(post.post.$id,
                {...data,
                    featuredImage: file ? file.$id : undefined,
                })
                if(dbpost)
                {
                    navigate(`/myPost`)
                }
        }
        else{
            const file = service.uploadFile(data.image[0])            
            if (file) {
                // console.log((await file).$id);
                
                const fileId = (await file).$id
                
                data.featuredImage = fileId   
                const dbpost = await service.createPost({
                    ...data,
                     userId: userdata?.$id || userdata?.userData?.$id
                })
                if(dbpost)
                {                    
                    navigate(`/allPost`)
                }
            }
        }
    }

    const slugTransform = useCallback((value)=>{
        console.log("slug");
        console.log(value);
        
        console.log();
        
        
        if(value && typeof value === "string"){
            return value
                    .trim()
                    .toLowerCase()
                    .replace(/\s+/g, '-')         
                    .replace(/[^a-z0-9-]/g, '')
        }    
        return ''
    },[])

    useEffect(()=>{
        const subcription = watch((value,{name})=>{
            // console.log(name);
            
            if (name === 'title') {

                // console.log("in slug");   
                // console.log(slugTransform(value.title,{shouldValidate:true}));
                
                setValue('slug',slugTransform(value.title,{shouldValidate:true}))                
            }
        })

        return ()=>{
            subcription.unsubscribe()
        }
    },[watch,slugTransform,setValue])


    return (
        <>
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <div className='bg-white mb-5 '>
                    <Input
                    // value={post?.post?.title || ""}
                    label="title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                </div>
                <div className='bg-white'>
                    <Input
                    // value={post?.post?.slug || ""}
                    label="slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                </div>
                    
                    <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">

                <div className=' bg-white flex justify-center items-center'>
                    <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                </div>
                
                <div>
                    {post && (
                        <div className="w-full mb-4">
                            <img
                                src={service.getFilePreview(post.post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                </div>
                
                
                <SelectBtn
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 bg-white"
                    {...register("status", { required: true })}
                />
                <button type="submit" className="w-full bg-blue-500 p-2.5 hover:cursor-pointer hover:bg-blue-600 text-white rounded-lg">
                    {post ? "Update" : "Submit"}
                </button>
            </div>
        </form>
        </>
    )
}

export default PostForm
