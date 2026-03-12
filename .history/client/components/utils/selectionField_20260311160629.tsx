import React from 'react'

interface SelectionFieldProps {
    title: string
}

export default function SelectionField({title}:SelectionFieldProps) {
  return (
    <div className='flex flex-col justify-start items-start'>
      <span>{title}</span>
      <div className=''></div>
    </div>
  )
}


