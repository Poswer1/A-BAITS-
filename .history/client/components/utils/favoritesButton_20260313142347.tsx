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
        if(!token || !id) return
        const data = await addFavorite(token,id)
        if(data ===)
    }

  return (
    <div>
      
    </div>
  )
}
