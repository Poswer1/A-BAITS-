import { categoriesWithIcons } from '@/category/category';
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

    const lang = param.lang as string

    const slug: string[] = Array.isArray(param.slug)
    ? param.slug.map(s => decodeURIComponent(s).toLowerCase())
    : param.slug
    ? [decodeURIComponent(param.slug).toUpperCase()]
    : []

    let category: string | undefined;
    let subCategory: string | undefined;
    let subSubCategory: string | undefined;
    let city: string | undefined;

    if(ListLocation.find(c => c.name.toLowerCase() === slug[slug.length - 1].toLowerCase())) {
        city = slug[slug.length - 1]
        console.log(city || 'нету')
    } 
    
    const categoryData = categoriesWithIcons.find(c => c.name === slug[0])

    if (slug.length === 1 && categoryData) {
  category = slug[0]
}

else if (slug.length === 2 && categoryData) {
  const sub = categoryData.subcategories.find(s => s.name === slug[1])

  if (sub) {
    category = slug[0]
    subCategory = slug[1]
  }
}

else if (slug.length === 3 && categoryData) {
  const sub = categoryData.subcategories.find(s => s.name === slug[1])
  const subSub = sub?.subcategories?.find(ss => ss.name === slug[2])

  if (subSub) {
    category = slug[0]
    subCategory = slug[1]
    subSubCategory = slug[2]
  }
}

  return (
    <div>
      <h1>{category}</h1>
      <h1>{subCategory}</h1>
      <h1>{subSubCategory}</h1>
      <h1>{city}</h1>
    </div>
  )
}

