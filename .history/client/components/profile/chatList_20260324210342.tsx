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

                ): (

                )
                
            )
        }
        )}
    </div>
  )
}


