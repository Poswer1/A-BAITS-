import { avatarBlock, overlay } from '@/styles/global'
import { animationOpacity } from '@/styles/style'
import { Camera, User } from 'lucide-react'

interface AvatarBlockProps {
    avatar: string
    size: string
}

export default function AvatarBlock({avatar, size}: AvatarBlockProps) {
 return (
    <>
    {avatar ? (
        <div className={`${avatarBlock} relative`} style={{width: `${size || '45'}px`, height: `${size || '45'}px`}} >
         <img src={`${BASE_URL}${avatar}`} className='w-full h-full object-cover z-0'/>
        </div>
    ): (
        <User size={size || '15'}/>
    )}
    </>
 )
}
