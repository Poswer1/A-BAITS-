'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import { BlogTypes } from '@/types/types'
import { Calendar, Eye } from 'lucide-react'
import React from 'react'
import { getRelativeTime } from '../ui/relativeTime'
import { useParams } from 'next/navigation'
import AvatarBlock from '../ui/avatar'


interface BlogBySlugProps {
    blog:BlogTypes
}

export default function BlogBySlug({blog}:BlogBySlugProps) {

    const BASE_URL = process.env.NEXT_PUBLIC_URL
    const params = useParams()
    const lang = params.lang as string
    const {t} = useTranslation()

  return (
    <div className='flex flex-col justify-start items-start w-full min-h-screen bg-gray-100 gap-5 text-black'>

        <div className='flex justify-center w-full md:h-100 relative bg-gray-200 overflow-hidden'>
            <div className="absolute inset-0 h-full bg-gradient-to-l from-orange-600/62 via-orange-600/52 to-transparent z-0"></div>
            <div className='flex flex-col md:flex-row relative w-[90%] md:w-[80%] gap-5 mt-5 md:mt-0'>
                <img src={`${BASE_URL}${blog.images}`} className='w-full md:w-120'/>
                <div className='flex flex-col justify-between p-5 gap-5'>

                    <div className='flex flex-col gap-2'>
                    <h1 className='text-3xl text-white'>{blog.title}</h1>
                    <div className='flex justify-start items-center gap-2'>
                        <AvatarBlock avatar={blog.author?.avatar} size='40'/>
                        <span className='text-white'>{blog.author?.name}</span>
                    </div> 
                    </div>

                    <div className="flex justify-start items-center gap-5">
                        <span className="text-gray-100 flex gap-1 text-sm"><Calendar size={20}/> {getRelativeTime(blog.createdAt, lang)}</span>
                        <span className="text-gray-100 flex gap-1 text-sm"><Eye size={20}/> 10</span>
                    </div>
                </div>
            </div>
        </div>

        <div className='flex justify-center w-full'>
            <div className='flex justify-start w-[90%] md:w-[80%]'>
                <p className='text-lg w-full md:w-2/3 2xl:w-1/2 whitespace-pre-line'>{blog.descriptions}</p>
            </div>
        </div>
    </div>
  )
}

