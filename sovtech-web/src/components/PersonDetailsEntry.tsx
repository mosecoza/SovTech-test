import React from 'react'

export default function PersonDetailsEntry({title, text}) {
    return (
        <div className='flex flex-row justify-between'>
            <p >{title}</p>
            <h6>
                {text}
            </h6>
        </div>
    )
}
