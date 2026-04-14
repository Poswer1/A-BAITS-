import { useSocketContext } from '@/app/context/SocketIo'
import { useTranslation } from '@/app/context/TranslationProvider'
import { button } from '@/styles/global'
import { NotificationTypes } from '@/types/types'
import { useClickOutside } from '@/utils/useClickOutside'
import { X } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getRelativeTime } from '../ui/relativeTime'

interface OpenNotification {
    setOpen:(t:boolean) => void
    open:boolean,
    setRead?:(t:boolean) => void
}

export default function OpenNotification({setOpen, open, setRead}: OpenNotification) {

    const {t} = useTranslation()
    const params = useParams()
    const lang = params.lang as string
    const {socket} = useSocketContext()
    const [loading, setLoading] = useState(true)
    const [notification, setNotification] = useState<NotificationTypes[]>([])

    useEffect(() => {
        if(!socket || !open) return

        socket.on('newNotification', (data) => {
            setNotification(prev => [...prev, data])
        })
        
        socket.emit('listenHistory')
        socket.on('historyNotification', (data) => {
            setNotification(data)
            setLoading(false)
        })

        socket.emit('readNotification')
        socket.on('read', () => {
            if(setRead) {
                setRead(false)
            }
        })

        return () => {
            socket.off('newNotification')
            socket.off('historyNotification')
            socket.off('read')
        }

    }, [socket, open])

     useEffect(() => {
    
        if(open) {
        document.body.style.overflow = 'hidden';
        } else {
        document.body.style.overflow = '';
        }

        return () => {
        document.body.style.overflow = '';
        }

    }, [open])

    const modalRef = useClickOutside(setOpen)

  return (
    <div ref={modalRef} className={`transition-all duration-500 ${open ? 'h-2/3' : 'h-0'} flex flex-col w-full md:w-150 justify-start overflow-hidden items-start custom-scrollbar bg-white fixed top-[9%] md:top-[10%] 2xl:top-[7%] right-0 md:right-10 gap-2 z-30 text-black shadow-xl md:rounded-xl`}>
        {loading ? (
            <h1>{t('header', 'loading')}</h1>
        ): (
            <>
                <div className='flex justify-between w-full px-2'>
                   <h1 className='text-lg'>{t('header', 'notification')}</h1>
                   <X className='flex md:hidden' onClick={() => setOpen(false)}/>
                </div>
                {notification.length === 0 && (
                    <h1>{t('header', 'notificationNoYet')}</h1>
                )}
                <div className='flex flex-col justify-start items-start w-full max-h-[85vh] md:max-h-full overflow-y-auto'>
                    {notification.map((n:NotificationTypes) => (
                        <Link href={`/${lang}/lot/${n?.lot?.lotNumber || '0000'}`} onClick={() => setOpen(false)} key={n._id} className='w-full cursor-pointer border-t border-b border-gray-300 p-2'>
                            <p className='text-gray-800 whitespace-pre-line'>
                            {t('header', n.notification)}
                            </p>
                            {n?.lot?.name && (
                            <p className='text-orange-600 font-medium whitespace-pre-line'>
                                {n.lot?.name}
                            </p>
                            )}
                            <span className='text-sm text-gray-500'>{getRelativeTime(n?.createdAt, lang)}</span>
                            {n?.notification === 'lotPurchased' && (
                                <Link href={`/${lang}/profile/chat?id=${''}`} className={`${button} w-full !p-1 mt-1`}>Перейти в чат</Link>
                            )}
                        </Link>
                    ))}
                </div>
            </>
        )}
    </div>
  )
}

