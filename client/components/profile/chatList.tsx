import { useEffect, useState } from 'react'
import AvatarBlock from '../utils/avatar'
import { hoverCat } from '@/styles/categoryList'
import { getMyChats } from '@/services/chat'
import { getUserById } from '@/services/user';

interface ChatListProps {
  setSelectChat: (v:string) => void;
}

export default function ChatList({setSelectChat}: ChatListProps) {

    const [allChats, setAllChats] = useState<any[]>([])
    const [myId, setMyId] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) return
        getUserById(token) 
        .then(data => {
            setMyId(data._id)
        })
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) return
        getMyChats(token)
        .then(data => {
            setAllChats(data)
        })
    }, [])


  return (
    <div className='flex flex-col justify-center items-center gap-2 bg-white'>
        {allChats.map((chat) => {
            if(!myId) return null;
            const user = chat.userTo?._id.toString() === myId ? chat.userFrom : chat.userTo;
            if (!user) return null;
            return (
                <div onClick={() => setSelectChat(user._id)} className={`${hoverCat} flex justify-between items-start gap-2 cursor-pointer p-3 w-90 border-b border-gray-200`}>
                    <div className='flex justify-center items-center gap-2'>
                        <AvatarBlock avatar={user?.avatar} size="50"/>
                        <div className='flex flex-col justify-center items-start'>
                            <h1>{user.name}</h1>
                            <p className='text-gray-500 text-sm'>Новое сообщение nfrjt!</p>
                        </div>
                    </div>
                    <span className='text-gray-500 text-sm'>3 часа назад</span>
                </div>
            )
        }
        )}
    </div>
  )
}


