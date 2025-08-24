import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import { useRef } from 'react';

function RTE({name,control,label,defaultValue=""}) {
      const editorRef = useRef(null);

    return (
        <>
         <div>
            {label && <label>{label}</label>}

            <Controller
            name={name || 'editor'}
            control={control}
            render={({field:{onChange}})=>(

        <Editor
        apiKey='wcorlo87gcvlq55bdhw8fxxal24tcz6b8clbaurywki2i8dy'
            initialValue={defaultValue}
            init={{
                initialValue: defaultValue,
                height: 500,
                menubar: true,
                plugins: [
                    "image",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                    "anchor",
                ],
                toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            onEditorChange={onChange}
        />


            )}
            />
         </div>
        </>
    )
}

export default RTE
