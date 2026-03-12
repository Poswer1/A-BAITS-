import React from 'react'

interface SelectionFieldProps {
    title: string
}

export default function SelectionField({title}:SelectionFieldProps) {
  return (
    <div className='flex flex-col justify-start items-start'>
      <span>{title}</span>
      <div className='p-2 bg-gray-200'></div>
    </div>
  )
}


