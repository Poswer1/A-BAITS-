'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Search, Menu, X, Bell, LogIn } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import { hover } from '@/styles/style'
import { hoverSub } from '@/styles/categoryList'
import { getUserById } from '@/services/user'
import { getStatusAuth, logout } from '@/services/auth'
import { useTranslation } from '@/app/context/TranslationProvider'
import { useSocketContext } from '@/app/context/SocketIo'

import CategoryList from './CategoryList'
import OpenProfile from './OpenProfile'
import AvatarBlock from '../ui/avatar'
import OpenNotification from './openNotification'
import ChangeLanguage from './changeLanguage'
import SearchSection from './SearchSection'

function Header() {
    const params = useParams()
    const lang = params.lang as string
    const { socket } = useSocketContext()
    const { t } = useTranslation()

    const [openCategory, setOpenCategory] = useState(false)
    const [openSearch, setOpenSearch] = useState(false)
    const [search, setSearch] = useState('')
    const [openProfile, setOpenProfile] = useState(false)
    const [openNotification, setOpenNotification] = useState(false)
    const [read, setRead] = useState(false)

    const [auth, setAuth] = useState(false)
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')

    const toggleCategory = () => setOpenCategory(prev => !prev)
    const toggleProfile = () => setOpenProfile(prev => !prev)
    const toggleNotification = () => setOpenNotification(prev => !prev)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const isAuth = await getStatusAuth()

                if (!isAuth) {
                    await logout()
                    setAuth(false)
                    setName('')
                    setAvatar('')
                    return
                }

                const data = await getUserById()

                setAuth(true)
                setName(data.name)
                setAvatar(data.avatar)
            } catch {
                setAuth(false)
                setName('')
                setAvatar('')
            }
        }

        fetchUser()

        window.addEventListener('auth-change', fetchUser)
        window.addEventListener('storage', fetchUser)

        return () => {
            window.removeEventListener('auth-change', fetchUser)
            window.removeEventListener('storage', fetchUser)
        }
    }, [])

    useEffect(() => {
        if (!socket) return

        const handleNewNotification = () => setRead(true)
        const handleCheckRead = (data: boolean) => setRead(data)

        socket.on('newNotification', handleNewNotification)
        socket.on('checkRead', handleCheckRead)
        socket.emit('checkRead')

        return () => {
            socket.off('newNotification', handleNewNotification)
            socket.off('checkRead', handleCheckRead)
        }
    }, [socket])

    return (
        <div className="flex flex-col justify-center items-center w-full z-20">
            <div className="flex flex-col justify-center items-start w-full md:w-[90%] p-2 relative">

                <div className="flex justify-between items-center w-full p-2">

                    {/* Logo */}
                    <Link href={`/${lang}`}>
                        <Image
                            src="/images/logo.png"
                            alt=""
                            width={200}
                            height={200}
                            className={`w-[500px] md:w-[150px] h-auto ${openSearch ? 'hidden md:block' : 'block'}`}
                        />
                    </Link>

                    {/* Center */}
                    <div className="flex justify-center items-center gap-3 w-full">
                        <button
                            onClick={toggleCategory}
                            className={`font-medium md:flex hidden justify-center items-center gap-1 ${hover} bg-orange-600 text-white p-2 px-4 rounded-md`}
                        >
                            <Menu size={18} />
                            {t('header', 'category')}
                        </button>

                        <SearchSection
                            openSearch={openSearch}
                            setOpenSearch={setOpenSearch}
                            lang={lang}
                            setSearch={setSearch}
                            search={search}
                        />
                    </div>

                    {/* Right */}
                    <div className="flex justify-center items-center gap-5 whitespace-nowrap relative">

                        <ChangeLanguage openSearch={openSearch} />

                        {/* Mobile search / menu */}
                        {openSearch ? (
                            search.length === 0 && (
                                <X
                                    className="text-gray-500 ml-2 md:hidden"
                                    onClick={() => setOpenSearch(false)}
                                />
                            )
                        ) : auth ? (
                            <Search
                                className="text-black md:hidden"
                                onClick={() => setOpenSearch(true)}
                            />
                        ) : (
                            <button
                                onClick={toggleCategory}
                                className="bg-orange-600 p-1 rounded-md md:hidden flex"
                            >
                                <Menu className="text-white" />
                            </button>
                        )}

                        {/* Auth */}
                        {!auth ? (
                            <Link
                                href={`/${lang}/auth/login`}
                                className={`p-2 px-4 rounded-md ${hover} ${openSearch ? 'hidden md:flex' : 'flex'} bg-orange-600 text-white gap-1 justify-center items-center`}
                            >
                                <LogIn size={18} />
                                {t('header', 'login')}
                            </Link>
                        ) : (
                            <>
                                {/* Notifications */}
                                <Bell
                                    className={`${hoverSub} hidden md:flex ${read ? 'text-orange-600' : 'text-gray-500'}`}
                                    onClick={toggleNotification}
                                />

                                {/* Mobile category */}
                                <button
                                    onClick={toggleCategory}
                                    className={`bg-orange-600 p-1 rounded-md md:hidden ${openSearch ? 'hidden' : 'flex'}`}
                                >
                                    <Menu className="text-white" />
                                </button>

                               
                                <div className={`flex flex-col justify-center items-start relative ${openSearch ? 'hidden md:block' : 'block'}`}>
                                    <button
                                        onClick={toggleProfile}
                                        className={`${hover} flex justify-center items-center gap-2`}
                                    >
                                        <AvatarBlock avatar={avatar} size="32" />

                                        <span className="text-black hidden md:block">
                                            {name || t('header', 'userNameNotFound')}
                                        </span>
                                    </button>

                                    <OpenProfile
                                        setOpenProfile={setOpenProfile}
                                        open={openProfile}
                                        name={name}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Categories */}
                {openCategory && (
                    <CategoryList
                        setOpenCategory={setOpenCategory}
                        openFrom="header"
                    />
                )}

                {/* Notifications */}
                <OpenNotification
                    setOpen={setOpenNotification}
                    open={openNotification}
                    setRead={setRead}
                />
            </div>
        </div>
    )
}

export default Header