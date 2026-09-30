'use client'

import { useTranslation } from '@/app/context/TranslationProvider';
import { arrowActive, hover, hoverLink} from '@/styles/style';
import { link } from 'fs';
import { ChevronDown, Clock3, Mail, Phone, Send, X } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import SupportChatButton from './ui/supportChatButton';


function Navbar() {

    const {t} = useTranslation()
    const params = useParams()
    const lang = params.lang as string

    const [openContact, setOpenContact] = useState(false)

    const contacts = [
        {type:'Telegram', text: 'auctionbaitsUA', link: 'https://t.me/auctionbaitsUA'},
        {type:'Телефон', text: '0630799193', link: 'tel:0630799193'},
        {type:'Email', text: 'infoabaits@gmail.com', link: 'mailto:infoabaits@gmail.com'}
    ]


  return (
    <div className='flex w-full bg-[#0F0F0F] p-2 justify-center'>
        <div className='relative z-20 w-full shrink-0 md:w-auto'>

        </div>
        
    </div>
  )
}

export default Navbar
