import React, { forwardRef, useId } from 'react'

function SelectBtn({
    options,
    label,
    className,
    ...props
},ref) 
{
    const id = useId()
    return (
      <div>
        {label && (<label htmlFor={id}>{label}</label>)}
        <select name="" id={id} ref={ref}>
            {options?.map((option)=>(
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
      </div>  
    )
}

export default forwardRef(SelectBtn)