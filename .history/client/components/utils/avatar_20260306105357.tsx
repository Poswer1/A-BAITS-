import { avatarBlock, overlay } from '@/styles/global'
import { animationOpacity } from '@/styles/style'
import { Camera, User } from 'lucide-react'

interface AvatarBlockProps {
    avatar: string
    size: string
    changeAvatar?: boolean,
    setChangeAvatar?: (value: boolean) => void
}

export default function AvatarBlock({avatar, size, changeAvatar, setChangeAvatar}: AvatarBlockProps) {
 return (
    <>
    {avatar ? (
        <div className={`${avatarBlock} relative`} style={{width: `${size || '45'}px`, height: `${size || '45'}px`}} onMouseEnter={() => setChangeAvatar && setChangeAvatar(true)} onMouseLeave={() => setChangeAvatar && setChangeAvatar(false)}>
         {changeAvatar && (
            <label className={`${overlay} ${animationOpacity} !absolute z-10 cursor-pointer`} htmlFor='changeFile'>
                <Camera className='text-white'/>
                <input type="file" className="hidden" id='changeFile'/>
            </label>   
         )}
         <img src={avatar} className='w-full h-full object-cover z-0'/>
        </div>
    ): (
        <User size={size || '15'}/>
    )}
    </>
 )
}
