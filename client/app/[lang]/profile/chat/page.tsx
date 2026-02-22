'use client'

import ChatUserCard from '@/components/profile/chatUserCard'
import AvatarBlock from '@/components/utils/avatar'
import { input } from '@/styles/createLot';
import { blockClass, pageContainerClass } from '@/styles/profile/profile'
import { hover } from '@/styles/style';
import { MoreVertical,Send} from "lucide-react";

function page() {

  const BASE_URL = process.env.NEXT_PUBLIC_URL

  return (
    <div className={pageContainerClass}>
      <h1 className='text-2xl'>Чат</h1>
      <div className='flex justify-center items-start gap-2'>

        <div className='flex flex-col justify-center items-center gap-2 bg-white'>
          {Array.from({length: 5}).map(() => (
            <ChatUserCard />
          ))}
        </div>

        <div className={`${blockClass} flex-col !w-250 !gap-0`}>
          
          <div className='flex justify-between items-center w-full border-b border-b-gray-200 pb-2'>
            <div className='flex gap-2'>
              {AvatarBlock('https://img.freepik.com/free-photo/successful-bearded-fisherman-standing-blue-wall-with-his-catch-having-happy-expression-handsome-young-man-holding-long-heavy-fish-hands-feeling-proud-excited_273609-8096.jpg?semt=ais_hybrid&w=740&q=80', '50')}
              <div className='flex flex-col justify-center items-start'>
                <h1>Могучее зерно</h1>
                <div className='flex justify-start items-center gap-1'>
                  <span className='bg-green-500 p-1 rounded-full'></span>
                  <span className='text-sm'>Онлайн</span>
                </div>
              </div>
            </div>
            <MoreVertical className={hover}/>
          </div>

          <div className='flex justify-start items-start w-full border-b border-gray-300 p-2 gap-2 cursor-pointer'>
            <img src={`${BASE_URL}/uploads/lots/1771710970665.webp`} className='w-15 rounded-md'/>
            <div className='flex flex-col justify-center items-start'>
              <h1 className='text-gray-500'>Готовий комплект для рибалки «КРОКОДИЛ» 24</h1>
              <span>1800 ₴</span>
            </div>
          </div>

          <div className='flex flex-col justify-start items-start overflow-auto h-150 max-h-150 w-full mt-2 noScrollbar'>
            <div className='max-w-3/6 self-start text-start'>
              <p className='bg-gray-100 rounded-md p-2'>Новое такое сообщение Новое такое сообщение Новое такое сообщение</p>
              <span className='text-gray-500 text-sm '>3 часа назад</span>
            </div>
            <div className='max-w-3/6 self-end text-end'>
              <p className='bg-orange-800/10 rounded-md p-2 text-start'>Новое такое сообщениеНовое такое сообщениеНовое такое сообщениеНовое такое сообщение</p>
              <span className='text-gray-500 text-sm'>3 часа назад</span>
            </div>
          </div>

          <div className='flex justify-center items-center w-full gap-2'>
            <input className={`${input}`} placeholder='Напишите сообщение'/>
            <button className={`${hover} p-2 bg-orange-600 rounded-full`}>
              <Send className='text-white' size={15}/>
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default page
