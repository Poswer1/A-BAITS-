'use client'

import { blockClass } from '@/styles/profile/profile'
import { animationOpacity } from '@/styles/style'
import QRCode from 'react-qr-code'
import { useState } from 'react'
import Link from 'next/link'
import { Copy, Check } from 'lucide-react'

export default function Page() {
const qrValue = 'https://send.monobank.ua/3Y9bBHwR4q'
const cardNumber = '4441 1111 4259 9418'

const [copied, setCopied] = useState(false)

const copyCard = async () => {
await navigator.clipboard.writeText(cardNumber)
setCopied(true)
setTimeout(() => setCopied(false), 2000)
}

return (
<div className={`${blockClass} w-full flex justify-between items-start gap-10`}>

```
  {/* LEFT SIDE */}
  <div className="flex flex-col gap-4 max-w-[420px]">

    <div className="bg-[#111] p-5 rounded-xl border border-neutral-800">
      <p className="text-gray-400 text-sm">Текущий баланс</p>

      <h1 className="text-3xl font-bold text-white mt-1">
        32.61 <span className="text-orange-500">₴</span>
      </h1>
    </div>

    <div className="flex flex-col gap-3">

      <p className="font-semibold text-lg">
        Чтобы пополнить баланс
      </p>

      <p className="text-gray-400 text-sm">
        Отправьте деньги по QR-коду или на карту
      </p>

      {/* CARD */}
      <div className="flex items-center justify-between bg-[#111] border border-neutral-800 rounded-lg px-4 py-3">

        <span className="text-orange-500 font-semibold tracking-wider">
          {cardNumber}
        </span>

        <button
          onClick={copyCard}
          className="flex items-center gap-1 text-gray-400 hover:text-white transition"
        >
          {copied ? <Check size={16}/> : <Copy size={16}/>}
          {copied ? 'Скопировано' : 'Копировать'}
        </button>

      </div>

      <p className="text-sm text-gray-500">
        Минимальная сумма пополнения — <span className="text-white">50 ₴</span>
      </p>

      <p className="text-xs text-gray-500 leading-relaxed">
        После поступления денег на карту баланс обновится автоматически.
        Обычно это занимает до 24 часов.
      </p>

    </div>
  </div>


  {/* QR BLOCK */}
  <Link
    href={qrValue}
    target="_blank"
    className="flex flex-col items-center bg-[#111] border border-neutral-800 rounded-xl p-6 hover:border-orange-500 transition"
  >

    <QRCode
      value={qrValue}
      size={200}
      className={`${animationOpacity} bg-white p-2 rounded-lg`}
    />

    <p className="text-sm text-gray-400 mt-4">
      Нажмите чтобы открыть оплату
    </p>

  </Link>

</div>
