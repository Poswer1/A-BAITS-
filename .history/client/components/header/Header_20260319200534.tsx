'use client'

import Image from 'next/image'
import { Search, Menu,X, Bell} from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { hover} from '@/styles/style';
import { getUserById } from '@/services/user';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useTranslation } from '@/app/context/TranslationProvider';
import CategoryList from './CategoryList';
import SearchValue from './SearchValue';
import OpenProfile from './OpenProfile';
import AvatarBlock from '../ui/avatar';
import { hoverSub } from '@/styles/categoryList';
import OpenNotification from './openNotification';
import { useSocketContext } from '@/app/context/SocketIo';
import ChangeLanguage from './changeLanguage';
import SearchSection from './SearchSection';


function Header() {

    const params = useParams()
    const lang = params.lang as string
    const {socket} = useSocketContext()

    const [openCategory, setOpenCategory] = useState(false)
    const [openSearch, setOpenSearch] = useState(false)
    const [search, setSearch] = useState('')
    const [openProfile, setOpenProfile] = useState(false)
    const [openNotification, setOpenNotification] = useState(false)
    const [read, setRead] = useState(false)

    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')

    const {t} = useTranslation()

    useEffect(() => {
        const fetchUser = async () => {
            try {
            const data = await getUserById();
            setName(data.name);
            setAvatar(data.avatar);
            } catch (err: any) {
            console.error('Помилка при отриманні користувача:', err.message);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        if(!socket) return

        socket.on('newNotification', () => {
            setRead(true)
        })

        socket.emit('checkRead')
        socket.on('checkRead', (data) => {
            setRead(data)
        })

    }, [socket])

 

  return (
    <div className='flex flex-col justify-center items-center w-full z-20'>
        <div className='flex flex-col justify-center items-center w-full md:w-[90%] p-2 relative'>
            <div className='flex justify-between items-center w-full p-2'>
                <Link href={`/${lang}`}>
                    <Image 
                        src={'/images/logo.png'}
                        alt=''
                        width={200}
                        height={200}
                        className={`w-[500px] md:w-[150px] h-auto ${openSearch ? 'hidden md:block' : 'block'}`}
                    />
                </Link>
                <div className='flex justify-center items-center gap-3 w-full'>
                    <button onClick={() => setOpenCategory(prev => !prev)} className={`font-medium md:flex hidden md:block justify-center items-center gap-1 ${hover} bg-orange-600 text-white p-2 px-4 rounded-md`}>
                        <Menu size={20}/>{t('header','category')}
                    </button>
                    <SearchSection openSearch={openSearch} setOpenSearch={setOpenSearch} lang={lang} setSearch={setSearch} search={search}/>
                </div>
                <div className='flex justify-center items-center gap-5 whitespace-nowrap relative'>
                        <span>
                            
                        </span>
                        <Menu className='text-orange-600'/>
                        <ChangeLanguage openSearch={openSearch}/>
                        
                        {openSearch ? (
                            search.length === 0 && (
                             <X className='text-gray-500 ml-2 md:hidden' onClick={() => setOpenSearch(false)}/>
                            )
                        ): (
                            <Search className='text-black md:hidden' onClick={() => setOpenSearch(true)}/>
                        )}
                                
                        <Bell className={`${hoverSub} ${openSearch ? 'hidden md:block' : 'block'} ${read ? 'text-orange-600': 'text-gray-500'}`} onClick={() => setOpenNotification(prev => !prev)}/>

                        <div className={`flex flex-col justify-center items-start relative ${openSearch ? 'hidden md:block' : 'block'}`}>
                            <div className={`${hover} flex justify-center items-center gap-2`} onClick={() => setOpenProfile(prev => !prev)}>
                                <AvatarBlock avatar={avatar} size="32"/>
                                <span className='text-black hidden md:block'>{name || t('header','userNameNotFound')}</span>
                            </div>
                            {openProfile && (
                                <OpenProfile setOpenProfile={setOpenProfile} name={name}/>
                            )}
                        </div>
                       
                        {/* <>
                            <Link href="/auth/register" className={`p-2 px-4 bg-orange-600 rounded-md ${hover} text-white font-medium`}>{t('header','register')}</Link>
                            <Link href="/auth/login" className={`p-2 px-4 rounded-md ${hover} bg-gray-100`}>{t('header','login')}</Link>
                        </> */}
                        {openNotification && (
                            <OpenNotification setOpen={setOpenNotification} lang={lang} setRead={setRead}/>
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
