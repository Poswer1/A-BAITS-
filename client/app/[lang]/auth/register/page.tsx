'use client'

import { animationScale, hover } from '@/styles/style'
import { useState } from 'react'
import Link from 'next/link';
import { Eye, EyeOff} from 'lucide-react';import { register } from '@/services/auth';
import { useParams, useRouter } from 'next/navigation';
import { useTranslation } from '@/app/context/TranslationProvider';
import { customInput, input } from '@/styles/auth';
import Toast from '@/components/ui/toast';
import { sendCode } from '@/services/admin/email';


function page() {

    const router = useRouter()
    const params = useParams()
    const lang = params.lang as string
    const {t} = useTranslation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setConfirPassword] = useState('')
    const [message, setMessage] = useState('')
    
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [step, setStep] = useState('startRegister')
    const [code, setCode] = useState('')

    const handleSendCode = async () => {
        if(!email || !password || !confirmPassword) {
            setMessage(t('auth', 'FillInAllDetails'))
            setTimeout(() => {
                setMessage('')
            },3000)
            return
        }

        if(password !== confirmPassword) {
            setMessage(t('auth', 'PasswordDontMatch'))
            setTimeout(() => {
                setMessage('')
            },3000)
            return
        }
        try {
            await sendCode(email, 'register')
            setStep('checkCode')
            setCode('')
        } catch (error:any) {
            setMessage(t('auth',error.message))
        }
    }

    const handleRegister = async () => {
        try {
          await register(email, password, name, code)
          setPassword('')
          setConfirPassword('')
          setEmail('')
          router.push(`/${lang}/auth/login`)
        } catch (error:any) {
            setMessage(t('auth', error.message))
            setTimeout(() => {
                setMessage('')
            }, 3000)
        }
    }

  return (
    <div className='flex flex-col justify-center items-center h-screen w-full text-black'>
        <div className='flex flex-col justify-center w-full items-center sm:w-2/5 xl:w-2/6 2xl:w-1/4 rounded-md p-5 gap-5'>
            <h1 className='text-black text-center font-bold text-2xl md:text-3xl'>{step === 'startRegister' ? t('auth', 'Register2') : t('auth', 'ConfirmCode') }</h1>
            {step === 'startRegister' ? (
                <>
                    <div className={customInput}>
                    <input placeholder={t('auth', 'EnterEmail')} value={email} onChange={(e) => setEmail(e.target.value)} className={input}/>
                    </div>

                    <div className={customInput}>
                    <input placeholder={t('auth', 'EnterYourName')} value={name} onChange={(e) => setName(e.target.value)} className={input}/>
                    </div>

                    <div className={customInput}>
                        <input type={showPassword ? 'text': 'password'} placeholder={t('auth', 'EnterPassword')} value={password} onChange={(e) => setPassword(e.target.value)} className={input}/>
                        {showPassword ? (
                            <EyeOff className={`${hover}`} size={20} onClick={() => setShowPassword(prev => !prev)}/>
                        ): (
                            <Eye className={`${hover}`} size={20} onClick={() => setShowPassword(prev => !prev)}/>
                        )}
                    </div>
                    <div className={customInput}>
                        <input type={showConfirmPassword ? 'text': 'password'} placeholder={t('auth', 'ConfirmPassword')} value={confirmPassword} onChange={(e) => setConfirPassword(e.target.value)} className={input}/>
                        {showConfirmPassword ? (
                            <EyeOff className={`${hover}`} size={20} onClick={() => setShowConfirmPassword(prev => !prev)}/>
                        ): (
                            <Eye className={`${hover}`} size={20} onClick={() => setShowConfirmPassword(prev => !prev)}/>
                        )}
                    </div>
                    <button onClick={handleSendCode} className={`bg-orange-600 text-white text-md p-2 flex justify-center items-center rounded-md ${hover} w-full`}>{t('auth','Register')}</button>
                    <p className='text-sm text-center text-gray-500'>{t('auth', 'pesonalDate')}</p>
                    <p className='w-full gap-1 text-gray-500 text-center'>{t('auth','alreadyRegistered')} <Link href={`/${lang}/auth/login`} className={`underline text-orange-600 ${hover}`}>{t('auth','Login')}</Link ></p>
                </>
            ): (
                <>
                <div className='flex flex-col justify-center items-start w-full gap-2'>
                    <div className={customInput}>
                         <input type='number' value={code} onChange={(e) => setCode(e.target.value)} placeholder={t('auth', 'ConfirmCode')} className={input}/>
                    </div>
                    <p className='text-sm text-gray-500'>{t('auth', 'weSendCode')}</p>
                    <button onClick={handleRegister} className={`bg-orange-600 text-white text-md p-2 flex justify-center items-center rounded-md ${hover} w-full`}>{t('auth','confirm')}</button>
                    <span onClick={() => setStep('startRegister')} className={`text-orange-600 ${hover} border-b border-orange-600`}>{t('auth', 'back')}</span>
                </div>
                </>
            )} 
        </div>
        <Toast error={message} message=''/>
    </div>
  )
}

export default page
