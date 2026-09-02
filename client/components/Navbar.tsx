'use client'

import { useTranslation } from '@/app/context/TranslationProvider';
import { arrowActive, hover, hoverLink} from '@/styles/style';
import { link } from 'fs';
import { ChevronDown, Clock3, Mail, Phone, Send, X } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';


function Navbar() {

    const {t} = useTranslation()
    const params = useParams()
    const lang = params.lang as string

    const [openContact, setOpenContact] = useState(false)

    const contacts = [
        {type:'Telegram', text: '@telegram', link: ''},
        {type:'Телефон', text: '+38 (000) 000-00-00', link: ''},
        {type:'Email', text: 'support@gmail.com', link: ''}
    ]


  return (
    <div className='flex w-full bg-[#0F0F0F] p-2 justify-center'>
        <div className='flex justify-start items-center gap-6 md:gap-5 text-white w-full md:w-[90%] overflow-x-auto whitespace-nowrap'>
            <Link href={`/${lang}/allLots?sort=newFirst`} className={hoverLink}>{t('navbar', 'newLot')}</Link>
            <Link href={`/${lang}/allLots?maxPrice=1`} className={hoverLink}>{t('navbar','lotfrom1UAH')}</Link>
            <Link href={`/${lang}/allLots?sort=moreBids`} className={hoverLink}>Топ {t('global','lot')}</Link>
            <Link href={`/${lang}/blog`} className={hoverLink}>{t('navbar','news')}</Link>
            <Link href='https://t.me/auctionbaitsUA' target="_blank" rel="noopener noreferrer" className={hoverLink}>Наш форум</Link>
                <span onClick={() => setOpenContact(prev => !prev)} className={`${hoverLink} flex justify-center items-center gap-2`}>{t('navbar','contact')} <ChevronDown className={arrowActive(openContact)}/></span>
                {openContact && (
                    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm' onClick={() => setOpenContact(false)}>
                        <div className='w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl' onClick={(e) => e.stopPropagation()}>
                            <div className='mb-5 flex items-start justify-between gap-3'>
                                <div>
                                    <h2 className='mt-1 text-2xl font-bold text-black'>Зв’яжіться з нами</h2>
                                    <p className='mt-2 text-sm text-gray-500'>Обирайте зручний спосіб — ми відповімо якнайшвидше.</p>
                                </div>
                                <X className='text-black cursor-pointer' onClick={() => setOpenContact(false)}/>
                            </div>

                            <div className='space-y-3'>
                                {contacts.map((contact, index) => (
                                    <Link
                                        href={`${contact.link}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3 transition-all duration-300 hover:border-orange-600 hover:bg-orange-600/10"
                                        >
                                        <div className="flex items-center gap-3">
                                            <div
                                            className={`rounded-xl p-2 ${
                                                contact.type === 'Telegram'
                                                ? 'text-sky-600 bg-sky-100'
                                                : contact.type === 'Телефон'
                                                ? 'text-emerald-600 bg-emerald-100'
                                                : 'text-violet-600 bg-violet-100'
                                            }`}
                                            >
                                            {contact.type === 'Telegram' ? (
                                                <Send size={18} />
                                            ) : contact.type === 'Телефон' ? (
                                                <Phone size={18} />
                                            ) : (
                                                <Mail size={18} />
                                            )}
                                            </div>

                                            <div>
                                            <p className="text-sm font-semibold text-slate-900">{contact.type}</p>
                                            <p className="text-sm text-slate-500">{contact.text}</p>
                                            </div>
                                        </div>
                                        </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            <span className={`${hover} p-2 bg-gray-200/30 rounded-md text-white`}>{t('navbar','support')}</span>
        </div>
    </div>
  )
}

export default Navbar
