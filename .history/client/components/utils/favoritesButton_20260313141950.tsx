'use client'

import { addFavorite } from "@/services/favorites"
import { useState } from "react"

export default function FavoritesButton() {

    const [favorite, setFavorite] = useState(false)

    const handleAddFavorite = async () => {
        const token = localStorage.getItem('token')
        if(!token) return
        await addFavorite()
    }

  return (
    <div>
      
    </div>
  )
}
