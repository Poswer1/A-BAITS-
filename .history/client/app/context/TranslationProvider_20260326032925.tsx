'use client'

import React from 'react'
import { createContext, useContext } from 'react';

const TranslationContext = createContext<Record<string, string>>({})  // рекорд это обьект с ключами и значениями

export default function TranslationProvider({children, messages}: {children: React.ReactNode, messages: Record<string, any>}) {
  return (
    <TranslationContext.Provider value={messages}> 
      {children}
    </TranslationContext.Provider > // Provider это раздачик 
  )
}

export function useTranslation() {
  type Messages = Record<string, Record<string, string>>;
  const messages = useContext(TranslationContext) // ПОЛУЧАЕМ ДАННЫЕ ИЗ Context в нашем случае messages

  const t = (block:string, key: string) => messages[block]?.[key] || [key];

  return{t}
}
