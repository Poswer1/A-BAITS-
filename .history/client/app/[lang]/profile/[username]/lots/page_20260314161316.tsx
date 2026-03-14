import React from 'react'

interface pageProps {
  params: {
    lang:string,
    username:string
  },
  searchParams: {
    page?:number
  }
}

function page() {
  return (
    <div className='flex gap-2 flex-col w-full'>
      <h1>Найдено: 3</h1>
    </div>
  )
}

export default page
