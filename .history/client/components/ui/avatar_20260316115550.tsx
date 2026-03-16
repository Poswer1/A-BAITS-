import { avatarBlock, overlay } from '@/styles/global'
import { User } from 'lucide-react'

interface AvatarBlockProps {
    avatar: string
    size: string
    preview:string
}

export default function AvatarBlock({avatar, size, preview}: AvatarBlockProps) {

const BASE_URL = process.env.NEXT_PUBLIC_URL

 return (
    <>
    {avatar || preview ? (
        <div className={`${avatarBlock} relative`} style={{width: `${size || '45'}px`, height: `${size || '45'}px`}} >
         <img src={avatar ?`${BASE_URL}${avatar}` : `${preview}` } className='w-full h-full object-cover z-0'/>
        </div>
    ): (
        <User size={size || '15'}/>
    )}
    </>
 )
}
