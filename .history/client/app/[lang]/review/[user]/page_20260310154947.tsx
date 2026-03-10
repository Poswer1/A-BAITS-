import { getUserByName } from '@/services/user'
import { UserTypes } from '@/types/types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'




export default async function page() {

    const params = useParams()
    const name = params.user as string

    const [user, setUser] = useState<UserTypes | null>(null)

    useEffect(() => {
        if(!name)
        getUserByName(name)
        .then(data => (

        ))
    }, [name])

  return (
    <div>
      
    </div>
  )
}

