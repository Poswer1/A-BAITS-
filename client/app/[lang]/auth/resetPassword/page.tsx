'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import InputField from "@/components/ui/inputFields"
import Toast from "@/components/ui/toast"
import { comparisonCode, sendCode, sendEmail } from "@/services/admin/email"
import { chagePassword } from "@/services/user"
import { customInput, input, titleStyle } from "@/styles/auth"
import { button } from "@/styles/global"
import { hover } from "@/styles/style"
import { ChevronLeft, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function page() {

    const {t} = useTranslation()
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [showPassword, setShowPassword] = useState(true)
    const [sendCodeAgain, setSendCodeAgain] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [repeatPassword,setRepeatPassword] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [step, setStep] = useState('sendCode')


    const handleEmailVerification = async () => {
        try {
            await sendCode(email)
            setMessage(`${t('auth', 'codeSendSuccess')}${email}`)
            setStep('EnterCode')
            setTimeout(() => {
                setMessage('')
            }, 3000)
        } catch (error:any) {
            setError(t("auth", error.message))
            setTimeout(() => {
                setError('')
            }, 3000)
        }
    }

    const handleComparisonCode = async () => {
        try {
            if(!code) return
            await comparisonCode(code)
            setStep('changePassword')
            setMessage(t('auth', 'codeSuccess'))
            setTimeout(() => {
                setMessage('')
            }, 3000)
        } catch (error:any) {
            setError(t('auth', error.message))
            setTimeout(() => {
                setError('')
            }, 3000)
        }
    }

    const handleChangePassword = async () => {
        if(repeatPassword !== newPassword) {
        setError(t('auth', 'PasswordDontMatch'))
            setTimeout(() => {
                setError('')
            }, 3000)
         }
        try {
            await chagePassword(email, newPassword)
            setEmail('')
            setNewPassword('')
            setRepeatPassword('')
            setMessage(t('auth', 'PasswordChangeSuccess'))
            setTimeout(() => {
                setMessage('')
                handleBack()
            }, 3000)
        } catch (error:any) {
            setError(t('auth', error.message))
            setTimeout(() => {
                setError('')
            }, 3000)
        }
    }


    const handleBack = () => {
        router.back()
    }


  return (
    <div className='flex flex-col justify-center items-center h-screen w-full text-black'>
      <div className='flex flex-col justify-center items-start w-full sm:w-2/5 xl:w-2/6 2xl:w-1/4 rounded-md p-5 gap-5'>
        {step === 'sendCode' ? (
            <>
                <h1 className={titleStyle}>{t('auth', 'resetPassword')}</h1>
                <InputField label="" type="text" placeholder="Ваш email" value={email} onChange={setEmail}/>
                <button onClick={handleEmailVerification} disabled={!email} className={`${button} disabled:opacity-50 disabled:cursor-not-allowed w-full`}>Отправить код</button>
                <span onClick={handleBack} className={`flex ${hover}`}><ChevronLeft />Назад</span>
            </>
        ): step === 'EnterCode' ? (
            <>
                <h1 className={titleStyle}>{t('auth', 'ConfirmCode')}</h1>
                <InputField label="" type="text" placeholder={t('auth', 'codeWith6Number')} value={code} onChange={setCode}/>
                <button onClick={handleComparisonCode} disabled={!code} className={`${button} disabled:opacity-50 disabled:cursor-not-allowed w-full`}>{t('auth', 'codeConfirm')}</button>
                <div className="flex justify-between w-full">
                 <span onClick={handleBack} className={`flex ${hover}`}><ChevronLeft />Назад</span>
                 <span className={`${hover} text-orange-600 border-b `}>{t('auth', 'codeReturnSend')}</span>
                </div>
            </>
        ): (
            <>
                <h1 className={titleStyle}>{t('auth', 'changePassword')}</h1>
                 <div className={customInput}>
                    <input type={showPassword ? 'text': 'password'} placeholder={t('auth', 'newPassword')} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={input}/>
                    {showPassword ? (
                        <EyeOff className={`${hover}`} size={20} onClick={() => setShowPassword(prev => !prev)}/>
                    ): (
                        <Eye className={`${hover}`} size={20} onClick={() => setShowPassword(prev => !prev)}/>
                    )}
                </div>
                <div className={customInput}>
                    <input type={showPassword ? 'text': 'password'} placeholder={t('auth', 'RepeatedPassword')} value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} className={input}/>
                    {showPassword ? (
                        <EyeOff className={`${hover}`} size={20} onClick={() => setShowPassword(prev => !prev)}/>
                    ): (
                        <Eye className={`${hover}`} size={20} onClick={() => setShowPassword(prev => !prev)}/>
                    )}
                </div>
                <button onClick={handleChangePassword} disabled={!newPassword || !repeatPassword} className={`${button} disabled:opacity-50 disabled:cursor-not-allowed w-full`}>{t('auth', 'passwordChange')}</button>
                <span onClick={handleBack} className={`flex ${hover}`}><ChevronLeft />Назад</span>
            </>
        )}
      </div>
      <Toast message={message} error={error}/>
    </div>
  )
}
