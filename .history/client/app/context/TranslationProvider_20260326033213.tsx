'use client'

import React from 'react'
import { createContext, useContext } from 'react';

  type Messages = Record<string, Record<string, string>>;

const TranslationContext = createContext<Messages | null>(null)  // рекорд это обьект с ключами и значениями

export default function TranslationProvider({children, messages}: {children: React.ReactNode, messages: Messages}) {
  return (
    <TranslationContext.Provider value={messages}> 
      {children}
    </TranslationContext.Provider > // Provider это раздачик 
  )
}

export function useTranslation() {
  const messages = useContext(TranslationContext)  // ПОЛУЧАЕМ ДАННЫЕ ИЗ Context в нашем случае messages

  const t = (block:string, key: string) => messages[block]?.[key] || [key];

  return{t}
}
