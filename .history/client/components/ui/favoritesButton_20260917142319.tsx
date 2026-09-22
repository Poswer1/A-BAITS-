'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import { addFavorite, getFavorite } from "@/services/favorites"
import { Star } from "lucide-react"
import { useEffect, useState } from "react"

interface FavoritesButtonProps {
    id:string
    compact?: boolean
}

export default function FavoritesButton({id, compact = false}: FavoritesButtonProps) {

    const {t} = useTranslation()

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
        const data = await addFavorite( id)
        setFavorite(data.success)
    }

    return (
        <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddFavorite() }} title={favorite ? t('lot', 'AlreadyFavoritre') : t('lot', 'lot-favorite')} className={`${compact ? 'w-auto' : 'w-full md:w-auto'} flex md:whitespace-nowrap text-center cursor-pointer justify-center items-center gap-2 p-2 rounded-md bg-orange-600/10 text-orange-600 text-sm md:text-base`}>
            <Star />
            <span className={compact ? 'hidden md:inline' : undefined}>{favorite ? t('lot', 'AlreadyFavoritre') : t('lot', 'lot-favorite')}</span>
        </span>
  )
}
