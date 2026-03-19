import { useEffect, useState } from 'react'
import AvatarBlock from '../ui/avatar'
import { hoverCat } from '@/styles/categoryList'
import { getMyChats } from '@/services/chat'
import { getUserById } from '@/services/user';

interface ChatListProps {
  setSelectChat: (v:string) => void;
  selectChat:string
  setTypeChat: (v:string) => void
}

export default function ChatList({setSelectChat, setTypeChat, selectChat}: ChatListProps) {

    const [allChats, setAllChats] = useState<any[]>([])
    const [myId, setMyId] = useState('')

    useEffect(() => {
        getUserById() 
        .then(data => {
            setMyId(data._id)
        })
    }, [])

    useEffect(() => {
        getMyChats()
        .then(data => {
            setAllChats(data)
        })
    }, [])


  return (
    <div className={`flex flex-col justify-center items-center gap-2 bg-white`}>
        {allChats.map((chat) => {
            if(!myId) return null;
            const user = chat.userTo?._id.toString() === myId ? chat.userFrom : chat.userTo;
            if (!user) return null;
            return (
                <div onClick={() => {setSelectChat(user._id), setTypeChat(chat.type)}} className={`${hoverCat} flex justify-between items-start gap-2 cursor-pointer p-3 transition-all duration-300 border-b border-gray-200 ${selectChat ? 'lg:w-20 2xl:w-90' : 'lg:w-90 2xl:w-90'}`}>
                    <div className='flex justify-center items-center gap-2'>
                        <AvatarBlock avatar={user?.avatar} size="50"/>
                        <div className={`flex flex-col justify-center items-start ${selectChat && 'hidden'}`}>
                            <h1>{user.name}</h1>
                            <p className='text-gray-500 text-sm'>Новое сообщение nfrjt!</p>
                        </div>
                    </div>
                    <span className={`text-gray-500 text-sm ${selectChat && 'hidden'}`}>3 часа назад</span>
                </div>
            )
        }
        )}
    </div>
  )
}


