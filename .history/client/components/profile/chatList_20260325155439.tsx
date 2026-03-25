import { useEffect, useState } from 'react'
import AvatarBlock from '../ui/avatar'
import { hoverCat } from '@/styles/categoryList'
import { getMyChats } from '@/services/chat'
import { getUserById } from '@/services/user';
import { useTranslation } from '@/app/context/TranslationProvider';
import { getRelativeTime } from '../ui/relativeTime';
import { useParams } from 'next/navigation';
import { ChatTypes } from '@/types/types';
import { useSocketContext } from '@/app/context/SocketIo';

interface ChatListProps {
  setSelectChat: (v:string) => void;
  selectChat:string
  setTypeChat: (v:string) => void
}

export default function ChatList({setSelectChat, setTypeChat, selectChat}: ChatListProps) {

    const {t} = useTranslation()
    const params = useParams()
    const lang = params.lang as string
    const {socket} = useSocketContext()

    const [allChats, setAllChats] = useState<any[]>([])
    const [unReadChats, setUnReadChats] = useState<ChatTypes[]>([])
    const [readChats, setReadChats] = useState<ChatTypes[]>([])
    const [loading, setLoading] = useState(true)
    const [myId, setMyId] = useState('')

    useEffect(() => {
        if(!socket) return
        socket.on('readChat', (data) => {
            setUnReadChats(prev => prev.filter(chat => chat._id !== data._id))
            setReadChats(prev => [...prev, data])
        })

        return () => {
            socket.off('readChat')
        }
    }, [socket])

    useEffect(() => {
        getUserById() 
        .then(data => {
            setMyId(data._id)
        })
        getMyChats()
        .then(data => {
            setUnReadChats(data.unReadChats)
            setReadChats(data.readChats)
            setLoading(false)
        })
    }, [])

    const renderChats = (chats: any[]) => {
    if (!myId) return null

    return chats?.map((chat) => {
            if (!chat.userFrom && !chat.userTo) return null;
            const user = chat.userTo?._id.toString() === myId ? chat.userFrom : chat.userTo;
            if (!user) return null;
            const lastMessage = chat.messages[chat.messages.length - 1]
            return (
                {loading ? (

                ): (

                )}
                
            )
        }
    )}

  return (
    <div className={`flex flex-col justify-start items-start w-full md:w-auto bg-white p-2 md:min-w-70`}>
        <h1 className='mb-1 px-2 md:p-0'>{t('chat', 'UnreadChats')}</h1>
        {unReadChats?.length === 0 ? (
        <span className='text-gray-500 text-sm p-4 w-full text-center'>{t('chat', 'AllChatsBeenRead')}</span>
        ) : (
        renderChats(unReadChats)
        )}

        <h1 className='mb-1 mt-1 px-2 md:p-0'>{t('chat', 'ReadChats')}</h1>
        {readChats?.length === 0 ? (
        <span className='text-gray-500 text-sm p-4 w-full text-center'>{t('chat', 'DontHaveChat')}</span>
        ) : (
        renderChats(readChats)
        )}
    </div>
  )
}


