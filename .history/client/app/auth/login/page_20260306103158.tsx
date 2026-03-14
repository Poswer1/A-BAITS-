'use client'

import { hover} from '@/styles/style'
import { customInput, input } from '@/styles/global'
import { useState } from 'react'
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { login } from '@/services/auth';
import { useRouter } from 'next/navigation';

function page() {

    const router = useRouter()

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
            const data = await login(email, password)
            localStorage.setItem('token', data.token)
            router.push('/')
           
        } catch (error:any) {
            setMessage(error.message)
        }
    }

  return (
    <div className='flex flex-col justify-center items-center h-[80vh] w-full'>
        <div className='flex flex-col justify-center items-center w-[20%] rounded-md p-5 gap-5'>
            {message && (
                <div style={{backgroundColor: 'rgba(255, 0, 0, 0.1)', color: 'red'}} className={message}>
                    {message}
                </div>
            )}
            <h1 className='text-black font-bold text-3xl'>Увійти до аккаунту</h1>
            
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
            <p className='w-full gap-1 text-gray-500'>Немає аккаунта? <Link href='/auth/register' className={`underline text-orange-600 ${hover}`}>Зареєструватись</Link></p>
        </div>
    </div>
  )
}

export default page
