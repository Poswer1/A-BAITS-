import { getUserByName } from '@/services/user'
import React from 'react'

interface pageProps {
    params: {
        lang:string,
        user: string
    }
}

export default async function page({params}: pageProps) {

    const param = await params
    const name = param.user as string

    const user = await getUserByName(name)

  return (
    <div>
      
    </div>
  )
}

