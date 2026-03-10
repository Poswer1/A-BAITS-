'use client'

import { useSocketContext } from '@/app/context/SocketIo';
import ChatList from '@/components/profile/chatList';
import AvatarBlock from '@/components/utils/avatar'
import OlnlineUser from '@/components/utils/onlineUser';
import { getRelativeTime } from '@/components/utils/relativeTime';
import { getLot } from '@/services/lot';
import { getUserById } from '@/services/user';
import { input } from '@/styles/createLot';
import { blockClass, pageContainerClass } from '@/styles/profile/profile'
import { animationOpacity, animationScale, hover } from '@/styles/style';
import { Check, MoreVertical,Send} from "lucide-react";
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from '@/app/context/TranslationProvider';
import { button } from '@/styles/global';
import { data } from 'react-router-dom';

function page() {

  const BASE_URL = process.env.NEXT_PUBLIC_URL

  const param = useParams()
  const lang = param.lang as string
  const {socket} = useSocketContext()
  const {t} = useTranslation()

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [selectChat, setSelectChat] = useState('')
  const [user, setUser] = useState<any | null>(null)
  const [lot, setLot] = useState<any | null>(null)
  const searchParams = useSearchParams()
  const selectIdChat = searchParams.get('id') || ''
  const lotId = searchParams.get('lotId')
  const [lotNumber, setLotNumber] = useState(lotId || '')
  const [typeChat, setTypeChat] = useState('')
  const [haveReview, setHaveReview] = useState(false)
  const [status, setStatus] = useState('')

  useEffect(() => {
    if(!selectIdChat) return
    setSelectChat(selectIdChat)
  }, [selectIdChat])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if(!lotNumber) return
    getLot(lotNumber)
    .then(data => {
      setLot(data)
    })
  }, [lotNumber])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token || !selectChat) return
    getUserById(token, selectChat)
    .then(data => {
      setUser(data)
    })
  }, [selectChat])

  useEffect(() => {    
    if(!socket) return
    socket.on('getHistory', (data) => {
      if(data && Array.isArray(data.historyMessage)) {
        setMessages(data.historyMessage)
        setTypeChat(data.type)
        setHaveReview(data.hadReview)
        setStatus(data.status)
        setLotNumber(data.numberLot)
        console.log('data')
      } else {
        setMessages([])
      }
    })

    socket.on('newReview', () => {
      setHaveReview(true)
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
    socket.emit('getChatHistory', {toUserId:selectChat, type:typeChat})
  }, [selectChat, typeChat, socket])

  const handleSendNewMessage = () => {
    if(!socket) return
    socket.emit('newMessage', {toUserId: selectChat, message:message, numberLot: lotId, type:typeChat})
  }

  return (
    <div className={pageContainerClass}>
      <h1 className='text-2xl'>Чат</h1>
      <div className='flex justify-center items-start gap-2'>
        
        <ChatList setSelectChat={setSelectChat} setTypeChat={setTypeChat}/>

        <div className={`${blockClass} flex-col min-h-150 !w-250 !gap-0`}>
          {selectChat.length === 0 ? (
            <h1>чат не выбран</h1>
          ): (
            <div className={`${animationOpacity} w-full`}>
            <div className='flex justify-between items-center w-full border-b border-b-gray-200 pb-2'>
              <Link href={`/${lang}/profile/${user?.name}`} className='flex gap-2'>
                <AvatarBlock avatar={user?.avatar} size="50"/>
                <div className='flex flex-col justify-center items-start'>
                  <h1>{user?.name}</h1>
                  <OlnlineUser id={user?._id}/>
                </div>
              </Link>
              <MoreVertical className={hover}/>
            </div>
            {lot && (
              <Link href={`/${lang}/lot/${lotNumber}`} className='flex justify-start items-start w-full border-b border-gray-300 p-2 gap-2 cursor-pointer'>
                <img src={lot?.images?.[0] ? `${BASE_URL}${lot?.images[0]}` : ''} className='w-15 rounded-md'/>
                <div className='flex flex-col justify-center items-start'>
                  <h1 className='text-gray-500'>{lot?.name}</h1>
                  <span>{lot?.startPrice} ₴</span>
                </div>
              </Link>
            )}

            <div className='flex flex-col justify-start items-start overflow-auto h-150 max-h-150 w-full mt-2 noScrollbar gap-2'>
              {typeChat === 'deal' && (
                <div className={`w-full flex flex-col justify-center items-center text-center`}>
                   <Image src={'/images/chat/deal.png'} alt='' width={200} height={200} className='w-[200px]'/>
                   <h1 className='text-xl'>{t('chat', 'successDeal1')}</h1>
                   <p className='w-2/3'>{t('chat', 'successDeal2')}</p>
                   <div className='flex justify-center items-center gap-2 mt-1'>
                    <Link href={`/${lang}/review/${selectChat}`} className={button}>{t('chat', 'ExchangeReview')}</Link>
                    <button className={`${button} !text-black bg-transparent border border-orange-600`}>{t('chat', 'InviteModer')}</button>
                  </div>
                </div>
              )}
              {messages?.map((msg, index) => {
                  const isMyMessage =
                    msg.to?.toString() === user?._id?.toString()

                  return (
                    <>
                    <div key={msg._id || index} className={`max-w-3/6 ${ isMyMessage ? 'self-end text-end': 'self-start text-start'}`}>
                      <p className={`rounded-md p-2 ${ isMyMessage ? 'bg-orange-800/10 text-start' : 'bg-gray-100'}`}>
                        {msg?.message}
                      </p>

                      <span className="text-gray-500 text-xs">
                       {getRelativeTime(msg.createdAt, lang)}
                      </span>
                    </div>
                    <div ref={messagesEndRef}/>
                    </>
                  )
              })}
              {haveReview  && (
                <div className={`${animationScale} flex flex-col justify-center items-center w-full`}>
                  <h1 className='text-xl'>{t('chat', 'NewReview')}</h1>
                  <p>{t('chat', 'NewReviewDesc')}</p>
                </div>
              )}
            </div>
            {status === 'Active' ? (
              <div className='flex justify-center items-center w-full gap-2'>
                <input className={`${input}`} value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Напишите сообщение'/>
                <button onClick={() => {
                  handleSendNewMessage()
                  setMessage('')
                  }} className={`${hover} p-2 bg-orange-600 rounded-full`}>
                  <Send className='text-white' size={15}/>
                </button>
              </div>
            ): (
              <h1 className={`text-xl flex justify-center items-center gap-1`}>Сделка успешно завершена! <Check className='text-orange-600'/></h1>
            )}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default page
