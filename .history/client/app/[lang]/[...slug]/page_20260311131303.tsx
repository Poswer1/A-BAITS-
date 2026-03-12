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
    } else if(slug.length === 1 && categoriesWithIcons.map(c => c.name === slug[0])) {
        category = slug[0]
    } else if(slug.length === 2 && categoriesWithIcons.map(c => c.subcategories.map(s => s.name === slug[1]))) {
        category = slug[0]
        subCategory = slug[1]
    } else if (slug.length === 3 && categoriesWithIcons.map(c => c.subcategories.map(s => s.subcategories.map(ss => ss.name === slug[2])))) {
        category = slug[0]
        subCategory = slug[1]
        subSubCategory = slug[3]
    }

  return (
    <div>
      <h1>{category}</h1>
      <h1>{s}</h1>
      <h1>{category}</h1>
      <h1>{category}</h1>
    </div>
  )
}

