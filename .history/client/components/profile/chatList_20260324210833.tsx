import { useEffect, useState } from 'react'
import AvatarBlock from '../ui/avatar'
import { hoverCat } from '@/styles/categoryList'
import { getMyChats } from '@/services/chat'
import { getUserById } from '@/services/user';
import { useTranslation } from '@/app/context/TranslationProvider';
import { getRelativeTime } from '../ui/relativeTime';
import { useParams } from 'next/navigation';

interface ChatListProps {
  setSelectChat: (v:string) => void;
  selectChat:string
  setTypeChat: (v:string) => void
}

export default function ChatList({setSelectChat, setTypeChat, selectChat}: ChatListProps) {

    const {t} = useTranslation()
    const params = useParams()
    const lang = params.lang as string

    const [allChats, setAllChats] = useState<any[]>([])
    const [myId, setMyId] = useState('')

    useEffect(() => {
        getUserById() 
        .then(data => {
            setMyId(data._id)
        })
        getMyChats()
        .then(data => {
            setAllChats(data)
        })
    }, [])

    const unReadChats = allChats.filter(chat => chat.messages.some(m => !m.read))
    const 

  return (
    <div className={`flex flex-col justify-start items-start w-full md:w-auto`}>
        <h1>{t('chat', 'UnreadChats')}</h1>
        <h1>{t('chat', 'ReadChats')}</h1>
        {allChats.map((chat) => {
            if(!myId) return null;
            const user = chat.userTo?._id.toString() === myId ? chat.userFrom : chat.userTo;
            if (!user) return null;
            const lastMessage = chat.messages[chat.messages.length - 1]
            return (
                allChats.length === 0 ? (
                    <span className='text-gray-500'>Нету чатов</span>
                ): (
                <div onClick={() => {setSelectChat(user._id), setTypeChat(chat.type)}} className={`${hoverCat} flex justify-between items-start gap-2 cursor-pointer p-3 transition-all  duration-300  border-b 2 w-full md:w-auto 2xl:w-90 border-gray-200 bg-white`}>
                    <div className='flex justify-center items-center gap-2'>
                        <AvatarBlock avatar={chat.lot?.images?.[0] ? chat.lot.images[0] : user?.avatar}  size="50"/>
                        <div className={`flex flex-col  justify-center items-start `}>
                            <h1 className='text-gray-500 text-sm'>{user.name}</h1>
                            <span className='text-sm hidden md:flex'>{chat.lot.name.length >= 30 ? chat.lot.name.slice(0, 30) + '...' : chat.lot.name}</span>
                            <span className='text-sm md:hidden'>{chat.lot.name.length >= 25 ? chat.lot.name.slice(0, 25) + '...' : chat.lot.name}</span>
                            <p className='text-gray-500 text-sm'>{lastMessage?.message || t('chat', 'NoLatestMessages')}</p>
                        </div>
                    </div>
                </div>
                )
            )
        }
        )}
    </div>
  )
}


