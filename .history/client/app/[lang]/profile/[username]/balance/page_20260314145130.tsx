'use client'

import { blockClass } from '@/styles/profile/profile'
import { animationOpacity } from '@/styles/style'
import QRCode from 'react-qr-code'
import Link from 'next/link'
import { Copy } from 'lucide-react'

export default function Page() {

  const qrValue = 'https://send.monobank.ua/3Y9bBHwR4q'
  const cardNumber = '4441 1111 4259 9418'

  const copyCard = () => {
    navigator.clipboard.writeText(cardNumber)
  }

  return (
    <div className={`${blockClass} flex justify-between items-start gap-10`}>

      {/* LEFT */}
      <div className='flex flex-col gap-4 max-w-[420px]'>

        <h1 className='text-xl font-semibold'>
          Текущий баланс:
          <span className='ml-2 text-2xl font-bold text-orange-500'>
            32.61 ₴
          </span>
        </h1>

        <p className='font-medium mt-2'>
          Чтобы пополнить баланс:
        </p>

        <ul className='text-gray-400 text-sm flex flex-col gap-1'>
          <li>• Отправьте деньги по QR-коду</li>
          <li>• Или переведите на карту</li>
        </ul>

        <div className='flex items-center gap-3 mt-2'>

          <span className='text-orange-500 font-semibold tracking-wider'>
            {cardNumber}
          </span>

          <button
            onClick={copyCard}
            className='text-gray-400 hover:text-white transition'
          >
            <Copy size={16}/>
          </button>

        </div>

        <p className='text-sm text-gray-500'>
          Минимальная сумма пополнения — 50 ₴
        </p>

        <p className='text-xs text-gray-500'>
          После поступления денег баланс обновится в течение 24 часов.
        </p>

      </div>

      {/* QR */}
      <Link
        href={qrValue}
        target='_blank'
        className='flex flex-col items-center gap-3'
      >

        <QRCode
          value={qrValue}
          size={200}
          className={`${animationOpacity} bg-white p-2 rounded-lg`}
        />

        <span className='text-sm text-gray-400'>
          Нажмите чтобы открыть оплату
        </span>

      </Link>

    </div>
  )
}