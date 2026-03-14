'use client'

import { addFavorite } from "@/services/favorites"
import { Star } from "lucide-react"
import { useState } from "react"

interface FavoritesButtonProps {
    id:string
}

export default function FavoritesButton({id}: FavoritesButtonProps) {

    const [favorite, setFavorite] = useState(false)

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
    <span className="flex justify-center items-center gap-2 text-orange-600"><Star /> {t('lot', 'lot-favorite')}</span><Star
  )
}
