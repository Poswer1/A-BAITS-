import React from 'react'

interface pageProps {
params: {
    lang: string;
    slug?: string | string[];
  };
searchParams: {
    minPrice: string,
    maxPrice:string,
    state: string
}
}

function page({params, searchParams}: pageProps) {

    const param = await params
    const search

  return (
    <div>
      
    </div>
  )
}

export default page
