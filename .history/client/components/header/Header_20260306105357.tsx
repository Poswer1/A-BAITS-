'use client'

import Image from 'next/image'
import { Search, Menu, User, X, Globe, ChevronDown} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { arrowActive, hover} from '@/styles/style';
import { getUserById } from '@/services/user';
import { useParams, usePathname } from 'next/navigation';
import { useTranslation } from '@/app/context/TranslationProvider';
import CategoryList from './CategoryList';
import SearchValue from './SearchValue';
import OpenProfile from './OpenProfile';
import {useClickOutside} from '@/utils/useClickOutside';
import { avatarBlock } from '@/styles/global';
import AvatarBlock from '../utils/avatar';


function Header() {

    const pathname = usePathname()
    const params = useParams()
    const lang = params.lang as string

    const [openCategory, setOpenCategory] = useState(false)
    const [openSearch, setOpenSearch] = useState(false)
    const [search, setSearch] = useState('')
    const [openLanguage, setOpenLanguage] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)
    

    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')

    const {t} = useTranslation()

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
            const data = await getUserById(token);
            setName(data.name);
            setAvatar(data.avatar);
            } catch (err: any) {
            console.error('Помилка при отриманні користувача:', err.message);
            }
        };

        fetchUser();
    }, []);

     const modalRef = useClickOutside(setOpenLanguage)

  return (
    <div className='flex flex-col justify-center items-center w-full z-20'>
        <div className='flex flex-col justify-center items-center w-[90%] p-2 relative'>
            <div className='flex justify-between items-center w-full p-2'>
                <Link href={`/${lang}`}>
                    <Image 
                        src={'/images/logo.png'}
                        alt=''
                        width={200}
                        height={200}
                        className='w-[150px] h-auto'
                    />
                </Link>
                <div className='flex justify-center items-center gap-3 w-full'>
                    <button onClick={() => setOpenCategory(prev => !prev)} className={`font-medium flex justify-center items-center gap-1 ${hover} bg-orange-600 text-white p-2 px-4 rounded-md`}><Menu size={20}/>{t('header','category')}</button>
                    <div className='flex flex-col justify-center items-center w-[40%] relative'>
                        <div className={`flex justify-start items-center p-2 gap-2 bg-gray-100 rounded-md border border-gray-200 w-full ${openSearch && 'z-20'}`}>
                            <Search size={20} className='text-gray-500'/>
                            <input placeholder={t('header','searchPlaceholder')} className='text-base outline-none w-full' onChange={(e) => {setSearch(e.target.value), setOpenSearch(true)}} value={search}/>
                            {openSearch && search.length > 0 &&(
                            <X className={hover} onClick={() => {setSearch(''), setOpenSearch(false)}}/>
                            )}
                        </div>
                        {openSearch && search.length > 0 &&(
                            <SearchValue setOpenSearch={setOpenSearch} search={search}/>
                        )}
                    </div>
                </div>
                <div className='flex justify-center items-center gap-3 whitespace-nowrap'>
                            <div onClick={() => setOpenLanguage(prev => !prev)}className='flex justify-center items-center gap-2 cursor-pointer relative '>
                                <Globe />
                                {pathname === '/uk' ? 'Українська' : 'Русский'}
                                <ChevronDown  className={arrowActive(openLanguage)}/>
                                {openLanguage && (
                                    <div ref={modalRef} onClick={(e) => e.stopPropagation()} className='w-full p-2 absolute top-[100%] flex flex-col justify-center items-start z-10 bg-white text-black rounded-xl gap-2'>
                                        <Link href={'/ru'} className={hover} onClick={() => setOpenLanguage(false)}>Русский</Link>
                                        <Link href={'/uk'} className={hover} onClick={() => setOpenLanguage(false)}>Українська</Link>
                                    </div>
                                )}
                            </div>
                    {localStorage.getItem('token') ? (
                            <div className={`flex justify-center items-center gap-5`}>
                            <div className='flex flex-col justify-center items-start relative'>
                                <div className={`${hover} flex justify-center items-center gap-2`} onClick={() => setOpenProfile(prev => !prev)}>
                                    <AvatarBlock avatar={avatar} size="32"/>
                                    <span>{name || t('header','userNameNotFound')}</span>
                                </div>
                                {openProfile && (
                                    <OpenProfile setOpenProfile={setOpenProfile} name={name}/>
                                )}
                            </div>
                            </div>
                        ): (
                            <>
                                <Link href="/auth/register" className={`p-2 px-4 bg-orange-600 rounded-md ${hover} text-white font-medium`}>{t('header','register')}</Link>
                                <Link href="/auth/login" className={`p-2 px-4 rounded-md ${hover} bg-gray-100`}>{t('header','login')}</Link>
                            </>
                    )}
                </div>
            </div>
            {openCategory && (
               <CategoryList setOpenCategory={setOpenCategory} openFrom='header'/>
            )}
            
        
        </div>
    </div>
  )
}

export default Header
