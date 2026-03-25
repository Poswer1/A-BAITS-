'use client'

import { animationScale, hover} from '@/styles/style'
import { useState } from 'react'
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { login } from '@/services/auth';
import { useParams, useRouter } from 'next/navigation';
import { customInput, input } from '@/styles/auth';

function page() {

    const router = useRouter()
    const params = useParams()
    const lang = params.lang as string
    const {t} = useT

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = async () => {
        if(!email || !password) {
            setMessage('Заповніть усі дані')
            setTimeout(() => {
                setMessage('')
            },3000)
            return
        }
        try {
            await login(email, password)
            router.push('/')
           
        } catch (error:any) {
            setMessage(error.message)
            setTimeout(() => {
                setMessage('')
            }, 3000)
        }
    }

  return (
    <div className='flex flex-col justify-center items-center h-screen w-full text-black'>
        <div className='flex flex-col justify-center items-center sm:w-2/5 xl:w-2/6 2xl:w-1/4 rounded-md p-5 gap-5'>
             {message && (
              <span className={`${animationScale} text-red-500`}>{message}</span>
             )}
            <h1 className='text-black text-center font-bold text-2xl md:text-2xl xl:text-3xl'>Увійти до аккаунту</h1>
            
            <div className={customInput}>
                <input placeholder='Введіть Email' value={email} onChange={(e) => setEmail(e.target.value)} className={input}/>
            </div>
            
            <div className={customInput}>
                <input type={showPassword ? 'text': 'password'} placeholder='Введіть пароль' value={password} onChange={(e) => setPassword(e.target.value)} className={input}/>
                 {showPassword ? (
                    <EyeOff className={`${hover}`} size={20} onClick={() => setShowPassword(prev => !prev)}/>
                ): (
                    <Eye className={`${hover}`} size={20} onClick={() => setShowPassword(prev => !prev)}/>
                )}
            </div>
            <button onClick={handleLogin} className={`bg-orange-600 text-white text-md p-2 flex justify-center items-center rounded-md ${hover} w-full`}>Увійти</button>
            <p className='text-sm text-center text-gray-500'>Ваші персональні дані не будуть передані третім особам. Дякуємо за довіру!</p>
            <p className={`w-full text-end text-orange-600 ${hover} underline`}>Забули пароль?</p>
            <p className='w-full gap-1 text-gray-500'>Немає аккаунта? <Link href={`/${lang}/auth/register`} className={`underline text-orange-600 ${hover}`}>Зареєструватись</Link></p>
        </div>
    </div>
  )
}

export default page
