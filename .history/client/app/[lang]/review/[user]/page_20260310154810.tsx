import { getUserByName } from '@/services/user'




export default async function page() {

    const params = useParams()

    const user = await getUserByName(name)

  return (
    <div>
      
    </div>
  )
}

