'use client'

import { overlay } from '@/styles/global'
import { Ban, AlertTriangle} from 'lucide-react'
import { animationScale, hover } from '@/styles/style'
import Link from 'next/link'
import Countdown from '@/components/ui/countdown'
import { useTranslation } from '@/app/context/TranslationProvider'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import GetStatusUser from '@/utils/getStatusUser'
import { hoverCat, hoverSub } from '@/styles/categoryList'


interface BlockedModalProps {
    mode:string
}

export default function BlockedModal({mode}:BlockedModalProps) {

    const router = useRouter()
    const params = useParams()
    const lang = params.lang as string

    const {t} = useTranslation()
    const [open, setOpen] = useState(true)
    const {status, UnblockDate} = GetStatusUser()

     useEffect(() => {
    
        if(open && status !== 'No restrictions') {
        document.body.style.overflow = 'hidden';
        } else {
        document.body.style.overflow = '';
        }

        return () => {
        document.body.style.overflow = '';
        }

    }, [open, status])

    const handleBack = () => {
        router.back()
    }

  return (
    (status === 'Blocked' || status === 'Temporary' && open ) && (
        <div className={`${overlay}`}>
            <div className={`${animationScale} flex flex-col justify-center items-center bg-white w-[90%] lg:w-2/5 2xl:w-1/3 p-10 rounded-xl gap-2`}>
                {status === 'Blocked' ? (
                    <Ban size={80} className='text-red-500'/>
                ): (
                    <AlertTriangle size={80} className='text-yellow-400'/>
                )}
                <h1 className='text-xl md:text-2xl text-center'>{ status === 'Blocked' ? t('violations', 'Blocked') : t('violations', 'Temporary')}</h1>
                <p className='text-xs md:text-sm text-center'>{status === 'Blocked' ? t('violations', 'challenge') : t('violations', 'TemporaryDesc')}</p>
                {status === 'Temporary' && (
                    <span className='flex flex-col md:flex-row gap-2 text-center'>{t('violations', 'UnblockDate')} <Countdown date={UnblockDate}/></span>
                )}
                <div className='flex gap-4'>
                    <Link href={'/'} className={hover}>{t('violations', 'Support')}</Link>
                    {status === 'Blocked' && (
                      <Link href={`/${lang}/auth/register`} className={hoverSub}>{t('violations', 'createNewAccount')}</Link>
                    )}
                    <span onClick={() => mode === 'general' ? setOpen(false) : handleBack()} className={`${status !== 'Temporary' && 'hidden'} ${hover} text-orange-600`}>{mode === 'general' ? t('violations', 'IgotIt'): 'Назад'}</span>
                </div>
            </div>
        </div>
    )
  )
}


