'use client'

import { animationScale, hover} from '@/styles/style'
import { useState } from 'react'
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { login } from '@/services/auth';
import { useParams, useRouter } from 'next/navigation';
import { customInput, input } from '@/styles/auth';
import { useTranslation } from '@/app/context/TranslationProvider';

function page() {

    const router = useRouter()
    const params = useParams()
    const lang = params.lang as string
    const {t} = useTranslation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = async () => {
        if(!email || !password) {
            setMessage(t('auth', 'FillInAllDetails'))
            setTimeout(() => {
                setMessage('')
            },3000)
            return
        }
        try {
            await login(email, password)
            router.push('/')
           
        } catch (error:any) {
            setMessage(t('auth', error.message))
            setTimeout(() => {
                setMessage('')
            }, 3000)
        }
    }

  return (
    <div className='flex flex-col justify-center items-center md:h-[80%] w-full text-black'>
        <div className='flex flex-col justify-center items-center sm:w-2/5 xl:w-2/6 2xl:w-1/4 rounded-md p-5 gap-5'>
             {message && (
              <span className={`${animationScale} text-red-500`}>{message}</span>
             )}
            <h1 className='text-black text-center font-bold text-2xl md:text-3xl'>{t('auth', 'LoginInAccount')}</h1>
            
            <div className={customInput}>
                <input placeholder={t('auth', 'EnterEmail')} value={email} onChange={(e) => setEmail(e.target.value)} className={input}/>
            </div>
            
            <div className={customInput}>
                <input type={showPassword ? 'text': 'password'} placeholder={t('auth', 'EnterPassword')} value={password} onChange={(e) => setPassword(e.target.value)} className={input}/>
                 {showPassword ? (
                    <EyeOff className={`${hover}`} size={20} onClick={() => setShowPassword(prev => !prev)}/>
                ): (
                    <Eye className={`${hover}`} size={20} onClick={() => setShowPassword(prev => !prev)}/>
                )}
            </div>
            <button onClick={handleLogin} className={`bg-orange-600 text-white text-md p-2 flex justify-center items-center rounded-md ${hover} w-full`}>{t('auth', 'Login')}</button>
            <p className='text-sm text-center text-gray-500'>{t('auth', 'pesonalDate')}</p>
            <p className={`w-full text-end text-orange-600 ${hover} underline`}>{t('auth', 'forgotPassword')}</p>
            <p className='w-full gap-1 text-gray-500'>{t('auth', 'DontHaveAccount')} <Link href={`/${lang}/auth/register`} className={`underline text-orange-600 ${hover}`}>{t('auth', 'Register')}</Link></p>
        </div>
    </div>
  )
}

export default page
