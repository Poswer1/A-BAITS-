import { getUserByName } from '@/services/user'



export default async function page({params}: pageProps) {

    const param = await params
    const name = param.user as string

    const user = await getUserByName(name)

  return (
    <div>
      
    </div>
  )
}

