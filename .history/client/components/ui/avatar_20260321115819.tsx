import { avatarBlock, overlay } from '@/styles/global'
import { User } from 'lucide-react'

interface AvatarBlockProps {
    avatar: string
    size: string
    preview?:string
}

export default function AvatarBlock({avatar, size, preview}: AvatarBlockProps) {

const BASE_URL = process.env.NEXT_PUBLIC_URL

 return (
    <>
        <div className={`bg-gray-300 rounded-full flex justify-center items-center overflow-hidden cursor-pointer relative`} style={{width: `${size || '45'}px`, height: `${size || '45'}px`}} >
         <img src={preview ? `${preview}` : `${BASE_URL}${avatar}`} className='w-full h-full object-cover z-0'/>
        </div>
    </>
 )
}
