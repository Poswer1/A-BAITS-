import { getUserByName } from '@/services/user'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'




export default async function page() {

    const params = useParams()
    const name = params.user as string

    

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

