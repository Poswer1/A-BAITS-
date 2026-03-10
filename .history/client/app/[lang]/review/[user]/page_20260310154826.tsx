import { getUserByName } from '@/services/user'
import { useParams } from 'react-router-dom'




export default async function page() {

    const params = useParams()
    const name = params.user as string

    const user = await getUserByName(name)

  return (
    <div>
      
    </div>
  )
}

