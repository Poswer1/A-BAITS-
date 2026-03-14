'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import { addFavorite, getFavorite } from "@/services/favorites"
import { Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface FavoritesButtonProps {
    id:string
}

export default function FavoritesButton({id}: FavoritesButtonProps) {

    const {t} = useTranslation()
    const router = useRouter()

    const [favorite, setFavorite] = useState(false)
    const [allFavorites, setAllFavorites] = useState<string[]>([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) return

        getFavorite(token)
        .then(data => {
            setAllFavorites(data)
        })

        const isFavorites = allFavorites.some(f => f === id)
        if(isFavorites) {
                setFavorite(true)
            }

    }, [])

    const handleAddFavorite = async () => {
        const token = localStorage.getItem('token')
        if(!token) {
            router.push('/auth/login')
            return
        }
        if(!id) return
        const data = await addFavorite(token,id)
        if(data.success) {
            setFavorite(true)
        } else {
            setFavorite(false)
        }
    }

  return (
    <span onClick={(e) => {handleAddFavorite(), e.preventDefault()}} className="flex justify-center items-center gap-2 p-2 rounded-md bg-orange-600/10 text-orange-600"><Star /> {favorite ? t('lot', 'AlreadyFavoritre') : t('lot', 'lot-favorite')}</span>
  )
}
