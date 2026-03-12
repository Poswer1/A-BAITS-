import ListLocation from '../../../data/citiesUK.json'

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

export default async function page({params, searchParams}: pageProps) {

    const param = await params
    const search = await searchParams

    const slug: string[] = Array.isArray(param.slug)
    ? param.slug.map(s => decodeURIComponent(s).toLowerCase())
    : param.slug
    ? [decodeURIComponent(param.slug).toUpperCase()]
    : []

    let category: string | undefined;
    let subCategory: string | undefined;
    let subSubCategory: string | undefined;
    let city: string | undefined;

    ListLocation.map((c) => c.)



  return (
    <div>
      
    </div>
  )
}

