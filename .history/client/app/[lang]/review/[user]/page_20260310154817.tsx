import { getUserByName } from '@/services/user'
import { useParams } from 'react-router-dom'




export default async function page() {

    const params = useParams()
    const 

    const user = await getUserByName(name)

  return (
    <div>
      
    </div>
  )
}

