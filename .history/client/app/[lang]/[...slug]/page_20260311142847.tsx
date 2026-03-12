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



    let path = [...slug]
    const categoryData = categoriesWithIcons.find(c => c.name === path[0])

    if(ListLocation.find(c => c.name.toLowerCase() === path[path.length - 1].toLowerCase())) {
        city = path[path.length - 1]
        path.pop() // убераем city что бы он дальше не искался как категория/подкатегория тд
    } 


    if (path.length === 1 && categoryData) {
        category = lang === 'ru' ? ca
    }

    else if (path.length === 2 && categoryData) {
    const sub = categoryData.subcategories.find(s => s.name === path[1])

    if (sub) {
        category = path[0]
        subCategory = path[1]
    }
    }
    else if (path.length === 3 && categoryData) {
    const sub = categoryData.subcategories.find(s => s.name === path[1])
    const subSub = sub?.subcategories?.find(ss => ss.name === path[2])

    if (subSub) {
        category = path[0]
        subCategory = path[1]
        subSubCategory = path[2]
    }
}


  return (
    <div className='flex flex-col justify-center items-start w-full'>
        <h1 className='text-lg text-gray-500'>{category && `${category} |`} {subCategory && `${subCategory} |`} {subSubCategory && `${subSubCategory} |`} {city && `${city}`}</h1>
    </div>
  )
}

