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

    useEffect(() => {


        getFavorite()
        .then(data => {
            const isFavorites = data.some((f:string) => f === id)
            if(isFavorites) {
                setFavorite(true)
            }
        })
    }, [id])

    const handleAddFavorite = async () => {


        if(!id) return
        const data = await addFavorite(id)
        setFavorite(data.success)
    }

  return (
    <span onClick={(e) => {handleAddFavorite(), e.preventDefault()}} className="flex whitespace-nowrap cursor-pointer justify-center items-center gap-2 p-2 rounded-md bg-orange-600/10 text-orange-600"><Star /> {favorite ? t('lot', 'AlreadyFavoritre') : t('lot', 'lot-favorite')}</span>
  )
}
