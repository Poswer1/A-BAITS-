import React from 'react'

interface pageProps {
    params: {
        lang:string,
        user: string
    }
}

export default async function page({params}: pageProps) {

    const param = await params


  return (
    <div>
      
    </div>
  )
}

