import { useEffect, useState } from 'react'
import AvatarBlock from '../ui/avatar'
import { hoverCat } from '@/styles/categoryList'
import { getMyChats } from '@/services/chat'
import { getUserById } from '@/services/user';
import { useTranslation } from '@/app/context/TranslationProvider';
import { useParams } from 'next/navigation';
import { ChatTypes } from '@/types/types';
import Image from 'next/image';

interface ChatListProps {
  setSelectChat: (v:string) => void;
  selectChat:string
}

export default function ChatList({setSelectChat, selectChat}: ChatListProps) {

    const {t} = useTranslation()
    const params = useParams()

    const [activeChat, setActiveChat] = useState<ChatTypes[]>([])
    const [unActiveChat, setUnActiveChat] = useState<ChatTypes[]>([])
    const [loading, setLoading] = useState(true)
    const [myId, setMyId] = useState('')

    useEffect(() => {
        getUserById() 
        .then(data => {
            setMyId(data._id)
        })
        getMyChats()
        .then(data => {
            setActiveChat(data.ActiveChat)
            setUnActiveChat(data.NotActiveChat)
            setLoading(false)
        })
    }, [])

    const renderSkeleton = () => (
    <div className='flex flex-col gap-2 w-full'>
        {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className='w-full px-3 py-6 skeleton rounded'></div>
        ))}
    </div>
    )

    const renderChats = (chats: ChatTypes[]) => {
    if (!myId) return null

    return chats?.map((chat) => {
            const user = chat.users.filter(u => u._id !== myId);
            if (!user) return null;
            const lastMessage = chat.messages[chat.messages.length - 1]
            return (
                <div onClick={() => {setSelectChat(chat._id)}} className={`${hoverCat} flex justify-between items-start gap-2 cursor-pointer p-3 transition-all  duration-300  border-b border-t 2 w-full  2xl:w-90 border-gray-300 bg-white relative`}>
                        <div className='flex justify-center items-center gap-2'>
                            <AvatarBlock avatar={chat.lot?.images?.[0] ? chat.lot.images[0] : user[0]?.avatar}  size="50"/>
                            <div className={`flex flex-col  justify-center items-start `}>
                            <h1 className='text-gray-500 text-sm'>{user[0]?.name}</h1>
                            {chat.status !== 'Active' && (
                             <span className={`${'bg-gray-300 text-gray-500'}  px-1  text-sm absolute top-1 right-0`}>{t('chat', 'NotActive')}</span>
                            )}
                            <span className='text-sm hidden md:flex'>
                                {chat.lot
                                    ? chat.lot.name.length >= 30
                                    ? chat.lot.name.slice(0, 30) + '...'
                                    : chat.lot.name
                                    : t('chat', 'NoLot')} {/* Можно текст для отсутствующего лота */}
                                </span>

                                <span className='text-sm md:hidden'>
                                {chat.lot
                                    ? chat.lot.name.length >= 25
                                    ? chat.lot.name.slice(0, 25) + '...'
                                    : chat.lot.name
                                    : t('chat', 'NoLot')}
                                </span>
                            <p className='text-gray-500 text-sm'>{lastMessage?.message || t('chat', 'NoLatestMessages')}</p>
                        </div>
                    </div>
                </div>
            )
        }
    )}

  return (
    <div className={`flex flex-col justify-start overflow-x-hidden items-start w-full md:w-auto  md:min-w-80 ${selectChat && 'hidden md:flex'}`}>
        {(activeChat?.length === 0 && unActiveChat?.length === 0) ? (
            <div className='flex flex-col justify-center items-center w-screen'>
                <Image src={'/images/chat/noChat.png'} alt='' width={200} height={200}/>
                <h1 className='text-xl'>{t('chat', 'noChat')}</h1>
                <p className='text-sm text-center text-gray-500 w-[90%]'>{t('chat', 'noChatDesc')}</p>
            </div>
        ): (
            <>
            <h1 className='mb-1 px-2'>{t('chat', 'AllChatsActive')}</h1>
            <div className='flex flex-col w-full overflow-y-auto max-h-100 custom-scrollbar'>
                {loading ? (
                renderSkeleton()
                ): (
                activeChat?.length === 0 ? (
                    <span className='text-gray-500 text-sm p-4 w-full text-center'>{t('chat', 'DontHaveChatActive')}</span>
                    ) : (
                    renderChats(activeChat)
                )
                )}
            </div>

            <h1 className='mb-1 mt-1 px-2'>{t('chat', 'AllUnActiveChat')}</h1>
            <div className='flex flex-col w-full overflow-y-auto max-h-100 custom-scrollbar'>
                {loading ? (
                renderSkeleton()
                ): (
                unActiveChat?.length === 0 ? (
                    <span className='text-gray-500 text-sm p-4 w-full text-center'>{t('chat', 'AllChatsBeenRead')}</span>
                    ) : (
                    renderChats(unActiveChat)
                )
                )}
            </div>
            </>
        )}
    </div>
  )
}


