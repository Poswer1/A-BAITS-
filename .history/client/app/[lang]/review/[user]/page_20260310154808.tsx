import { getUserByName } from '@/services/user'
import { useParams } from 'next/navigation'



export default async function page() {

    const params = useParams()

    const user = await getUserByName(name)

  return (
    <div>
      
    </div>
  )
}

