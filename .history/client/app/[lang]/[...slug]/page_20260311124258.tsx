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

function page({params}: pageProps) {
  return (
    <div>
      
    </div>
  )
}

export default page
