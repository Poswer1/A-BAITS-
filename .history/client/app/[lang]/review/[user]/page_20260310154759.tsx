import { getUserByName } from '@/services/user'



export default async function page() {

    const param = await params
    const name = param.user as string

    const user = await getUserByName(name)

  return (
    <div>
      
    </div>
  )
}

