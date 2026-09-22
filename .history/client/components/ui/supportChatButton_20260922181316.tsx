'use client'

import { createSupportChat } from '@/services/chat'
import { useTranslation } from '@/app/context/TranslationProvider'
import { useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'
import Toast from './toast'
import { useParams } from 'react-router-dom'

interface SupportChatButtonProps {
  lang: string
  className?: string
  children: ReactNode
}

export default function SupportChatButton({lang, className = '', children}: SupportChatButtonProps) {
  const router = useRouter()
  const {t} = useTranslation()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const lang = params.lang as string

  const handleClick = async () => {
    if (loading) return
    setLoading(true)

    try {
      const data = await createSupportChat()
      if (!data?.chatId) throw new Error('SupportChatCreateError')
      router.push(`/${lang}/profile/chat?id=${data.chatId}`)
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'SupportChatCreateError'
      setError(t('chat', message))
      setTimeout(() => setError(''), 3000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button type="button" onClick={handleClick} disabled={loading} className={className}>
        {children}
      </button>
      <Toast message="" error={error} />
    </>
  )
}
