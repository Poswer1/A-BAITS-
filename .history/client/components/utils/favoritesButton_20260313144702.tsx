'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import { addFavorite } from "@/services/favorites"
import { Star } from "lucide-react"
import { useEffect, useState } from "react"

interface FavoritesButtonProps {
    id:string
}

export default function FavoritesButton({id}: FavoritesButtonProps) {

    const {t} = useTranslation()

    const [favorite, setFavorite] = useState(false)
    const [allFavorites, setAllFavorites] = useState<string[]>([])

    useEffect(() => {
        const token = localStorage.getItem('tokne')
    }, [])

    const handleAddFavorite = async () => {
        const token = localStorage.getItem('token')
        if(!token || !id) return
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
