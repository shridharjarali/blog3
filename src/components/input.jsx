import React, { forwardRef, useId, useState } from 'react'

const Input = forwardRef(function Input({
    // value,
    label,
    type = "text",
    className ="",
    ...props
},ref)
{
    // const [uservalue,setValue] = useState(value || '')
    const id = useId()
    return (
        <div>
            {
                label && <label htmlFor={id}>{label}</label>
            }
            <input type={type}   className={`${className}`} id={id} ref={ref} {...props}/>
        </div>
        
    )
})

export default Input
