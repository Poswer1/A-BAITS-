import React from 'react'

interface pageProps {
    params: {
        lang:string,
        user: string
    }
}

export default async function page({params}: pageProps) {

    const param = await params
    const id = param.user as string

    const user = 

  return (
    <div>
      
    </div>
  )
}

