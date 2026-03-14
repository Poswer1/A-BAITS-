'use client'

import { addFavorite } from "@/services/favorites"
import { useState } from "react"

interface FavoritesButtonProps {
    id:string
}

export default function FavoritesButton({id}: FavoritesButtonProps) {

    const [favorite, setFavorite] = useState(false)

    const handleAddFavorite = async () => {
        const token = localStorage.getItem('token')
        if(!token) return
        await addFavorite(token,)
    }

  return (
    <div>
      
    </div>
  )
}
