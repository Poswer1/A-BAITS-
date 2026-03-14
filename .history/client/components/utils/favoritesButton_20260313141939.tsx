'use client'

import { addFavorite } from "@/services/favorites"
import { useState } from "react"

export default function FavoritesButton() {

    const [favorite, setFavorite] = useState(false)

    const handleAddFavorite = async () => {
        await addFavorite()
    }

  return (
    <div>
      
    </div>
  )
}
