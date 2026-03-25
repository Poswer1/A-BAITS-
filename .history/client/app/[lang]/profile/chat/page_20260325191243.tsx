'use client'

import { useSocketContext } from '@/app/context/SocketIo';
import ChatList from '@/components/profile/chatList';
import AvatarBlock from '@/components/ui/avatar'
import OlnlineUser from '@/components/ui/onlineUser';
import { getRelativeTime } from '@/components/ui/relativeTime';
import { getUserById } from '@/services/user';
import { blockClass, pageContainerClass } from '@/styles/profile/profile'
import { hover } from '@/styles/style';
import { Check, ChevronLeft, MoreVertical,Send, X} from "lucide-react";
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from '@/app/context/TranslationProvider';
import { button, buttonWithoutBg } from '@/styles/global';
import { ChatTypes } from '@/types/types';

function page() {

  const BASE_URL = process.env.NEXT_PUBLIC_URL

  const param = useParams()
  const router = useRouter()
  const lang = param.lang as string
  const {socket} = useSocketContext()
  const {t} = useTranslation()

  const [messages, setMessages] = useState<string[]>([])
  const [chat, setChat] = useState<ChatTypes | null>(null)
  const [message, setMessage] = useState('')
  const [selectChat, setSelectChat] = useState('')
  const [user, setUser] = useState<any | null>(null)
  const [lotId, setLot] = useState<any | null>(null)
  const searchParams = useSearchParams()
  const selectIdChat = searchParams.get('id') || ''
  const lotId = searchParams.get('lotId')
  const [typeChat, setTypeChat] = useState('')
  const [status, setStatus] = useState('')
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(!selectIdChat) return
    setSelectChat(selectIdChat)
  }, [selectIdChat])

  useEffect(() => {
    if (!chatRef.current) return;

    chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [messages])

  useEffect(() => {
    if(!selectChat) return
    getUserById(selectChat)
    .then(data => {
      setUser(data)
    })
  }, [selectChat])

  useEffect(() => {    
    if(!socket) return
    socket.on('getHistory', (data) => {
      if(data) {
        setChat(data.history)
        setMessages(data.history.messages)
        console.log('data')
      } else {
        setChat(null)
      }
    })

    socket.on('newReview', (data) => {
      setMessages(prev => {
        const exist = prev.some(msg => msg._id === data.newMessage._id)
        if(exist) return prev
        return [...prev, data.newMessage]
      })
      setStatus(data.chatStatusText)
    })

    socket.on('message', (data) => {
      setMessages(prev => [...prev, data])
      console.log('такая дата', data)
    })
    return () => {
      socket.off("message")
      socket.off('getHistory')
    }
  }, [socket])

  useEffect(() => {
    if(!selectChat || !socket) return
    socket.emit('getChatHistory', {toUserId:selectChat, type:typeChat, lot:})
    socket.emit('readChat', {toUserId:selectChat, type:typeChat, lot:chat?.lot})
  }, [selectChat, typeChat, socket, chat])

  const handleSendNewMessage = () => {
    if(!socket) return
    socket.emit('newMessage', {toUserId: selectChat, message:message, numberLot: lotId, type:typeChat})
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className={`${pageContainerClass}`}>
      <h1 className={`text-xl 2xl:text-2xl lg:text-xl p-2 py-4 md:p-0 md:mb-2`}>Чат</h1>
      <div className='flex justify-start items-start gap-2 w-full'>
        <ChatList setSelectChat={setSelectChat} setTypeChat={setTypeChat} selectChat={selectChat}/>

        <div className={`${blockClass} ${!selectChat ? 'hidden md:block': 'fixed top-0 left-0 md:static'} h-screen md:h-160 2xl:h-190 flex-col xl:w-2/3 2xl:!w-3/5 !gap-0 `}>
          {!selectChat ? (
            <h1>чат не выбран</h1>
          ): (
            <>
            <div className='flex justify-between items-center w-full border-b border-b-gray-200 pb-2'>
              <Link href={`/${lang}/profile/${user?.name}`} className='flex gap-2 justify-center items-center'>
                <ChevronLeft onClick={handleBack} className='md:hidden'/>
                <AvatarBlock avatar={user?.avatar} size="50"/>
                <div className='flex flex-col justify-center items-start'>
                  <h1>{user?.name}</h1>
                  <OlnlineUser id={user?._id}/>
                </div>
              </Link>
              <MoreVertical className={hover}/>
            </div>
            {chat?.lot && (
              <Link href={`/${lang}/lot/${chat?.lot?.lotNumber}`} className='flex justify-start items-start w-full border-b border-gray-300 p-2 gap-2 cursor-pointer'>
                <img src={chat?.lot?.images?.[0] ? `${BASE_URL}${chat?.lot?.images[0]}` : ''} className='w-15 rounded-md'/>
                <div className='flex flex-col justify-center items-start'>
                  <h1 className='text-gray-500 md:hidden'>{chat?.lot?.name.length >= 20 ? chat?.lot?.name.slice(0, 20) + '...' : chat?.lot?.name}</h1>
                  <h1 className='text-gray-500 hidden md:flex'>{chat?.lot?.name}</h1>
                  <span>{chat?.lot?.startPrice} ₴</span>
                </div>
              </Link>
            )} 

            <div ref={chatRef} className='flex flex-col justify-start items-start overflow-auto max-h-full h-full w-full mt-2 noScrollbar gap-2'>
              {chat?.type === 'deal' && (
                <div className={`w-full flex flex-col justify-center items-center text-center`}>
                   <Image src={'/images/chat/deal.png'} alt='' width={200} height={200} className='w-[200px]'/>
                   <h1 className='text-xl'>{t('chat', 'successDeal1')}</h1>
                   <p className='w-full text-sm md:text-base md:w-2/3'>{t('chat', 'successDeal2')}</p>
                   <div className='flex flex-col md:flex-row w-full justify-center items-center gap-2 mt-1'>
                    <Link href={`/${lang}/review/${selectChat}/${chat?.lot?._id}`} className={`${button} w-full md:w-auto`}>{t('chat', 'ExchangeReview')}</Link>
                    <button className={`${buttonWithoutBg} w-full md:w-auto`}>{t('chat', 'InviteModer')}</button>
                  </div>
                </div>
              )}
              {messages?.map((msg, index) => {

                const isMyMessage =
                  msg.to?.toString() === user?._id?.toString()

                  if(msg.from === '507f1f77bcf86cd799439011') {
                    return (
                      msg.to !== user?._id && (
                        <div className='flex justify-center items-center w-full py-5'>
                            <h1 className='text-base text-center'>{t('chat', 'NewReview')}</h1>
                        </div>
                      )
                    )
                  }
                  return (
                    <>
                    <div key={msg._id || index} className={`max-w-3/6 ${ isMyMessage ? 'self-end text-end': 'self-start text-start'}`}>
                      <p className={`rounded-md p-2 ${isMyMessage ? 'bg-orange-600/10 text-start' : 'bg-gray-100'}`}>
                        {msg?.message}
                      </p>

                      <span className="text-gray-500 text-xs">
                       {getRelativeTime(msg.createdAt, lang)}
                      </span>
                    </div>
                    
                    </>
                  )
              })}
            </div>
            {chat?.status !== 'Close' ? (
              <div className='flex justify-center items-center w-full gap-2'>
                <input className={`w-full outline-none`} value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Напишите сообщение'/>
                <button onClick={() => {
                  handleSendNewMessage()
                  setMessage('')
                  }} className={`${hover} p-2 bg-orange-600 rounded-full`}>
                  <Send className='text-white' size={15}/>
                </button>
              </div>
            ): (
              <h1 className={`text-xl flex justify-center items-center gap-1 mt-2`}>{t('chat', 'successDeal')}<Check className='text-orange-600'/></h1>
            )}
            </>
          )}
        </div>

      </div>
    </div>
  )
}

export default page
