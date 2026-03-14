'use client'

import { customInput, hover, input} from '@/styles/style'
import { useState } from 'react'
import Link from 'next/link';
import { Eye, EyeOff} from 'lucide-react';import { register } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { messageError } from '@/styles/global';


function page() {

    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirPassword] = useState('')
    const [message, setMessage] = useState('')
    
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleRegister = async () => {
        if(!email || !password || !confirmPassword) {
            setMessage('Заповніть усі дані')
            setTimeout(() => {
                setMessage('')
            },3000)
            return
        }

        if(password !== confirmPassword) {
            setMessage('Паролі не співпадають')
            setTimeout(() => {
                setMessage('')
            },3000)
            return
        }
        try {
          const data = await register(email, password)
          setPassword('')
          setConfirPassword('')
          setEmail('')
          router.push('/auth/login')
        } catch (error:any) {
            setMessage(error.message)
            setTimeout(() => {
                setMessage('')
            }, 3000)
        }

    }

  return (
    <div className='flex flex-col justify-center items-center h-[80vh] w-full'>
        <div className='flex flex-col justify-center items-center w-[20%] rounded-md p-5 gap-5'>
            {message && (
                <div style={{backgroundColor: 'rgba(255, 0, 0, 0.1)', color: 'red'}} className={messageError}>
                    {message}
                </div>
            )}
            <h1 className='text-black font-bold text-3xl'>Реєстрація</h1>
                
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
            <div className={customInput}>
                <input type={showConfirmPassword ? 'text': 'password'} placeholder='Підтвердіть пароль' value={confirmPassword} onChange={(e) => setConfirPassword(e.target.value)} className={input}/>
                {showConfirmPassword ? (
                    <EyeOff className={`${hover}`} size={20} onClick={() => setShowConfirmPassword(prev => !prev)}/>
                ): (
                    <Eye className={`${hover}`} size={20} onClick={() => setShowConfirmPassword(prev => !prev)}/>
                )}
            </div>
            <button onClick={handleRegister} className={`bg-orange-600 text-white text-md p-2 flex justify-center items-center rounded-md ${hover} w-full`}>Зареєструватись</button>
            <p className='text-sm text-center text-gray-500'>Ваші персональні дані не будуть передані третім особам. Дякуємо за довіру!</p>
            <p className='w-full gap-1 text-gray-500 text-center'>Вже зареєстровані? <Link href='/auth/login' className={`underline text-orange-600 ${hover}`}>Увійти</Link ></p>
        </div>
    </div>
  )
}

export default page
