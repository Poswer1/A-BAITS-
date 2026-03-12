import { categoriesWithIcons } from '@/category/category';
import ListLocation from '../../../data/citiesUK.json'
import Catalog from '@/components/catalog/catalog';
import Filter from '@/components/catalog/filter';
import { getAllLot, getFilterLot } from '@/services/lot';

interface pageProps {
params: {
    lang: string;
    slug?: string | string[];
  };
searchParams: {
    minPrice: string,
    maxPrice:string,
    state: string[]
}
}

export default async function page({params, searchParams}: pageProps) {

    const param = await params
    const search = await searchParams

    const lang = param.lang as string

    const state: string[] = search.state
    ? (Array.isArray(search.state)
        ? search.state
        : [search.state]
        ).map(s => decodeURIComponent(s))
    : []

    const slug: string[] = Array.isArray(param.slug)
    ? param.slug.map(s => decodeURIComponent(s).toLowerCase())
    : param.slug
    ? [decodeURIComponent(param.slug).toLowerCase()]
    : []

    let category: string | undefined;
    let subCategory: string | undefined;
    let subSubCategory: string | undefined;
    let city: string | undefined;
    let langCategory: string | undefined;
    let langSubCategory: string | undefined;
    let langSubSubCategory: string | undefined;
    let langCity: string | undefined;


    let path = [...slug];
    const categoryData = categoriesWithIcons.find(c => c.name === path[0]);
    const cityData = ListLocation.find(c => c.name.toLowerCase() === path[path.length - 1].toLowerCase());

    if (cityData) {
        city = slug[slug.length -1]
        langCity = lang === 'ru' ? cityData.ru || cityData.name : cityData.uk || cityData.name;
        path.pop(); // убираем город
    }

    if (categoryData) {
        if (path.length >= 1) {
            category = lang === 'ru' ? categoryData.ru || categoryData.name : categoryData.uk || categoryData.name;
        }

        const sub = path.length >= 2 ? categoryData.subcategories.find(s => s.name === path[1]) : undefined;
        if (sub) {
            subCategory = lang === 'ru' ? sub.ru || sub.name : sub.uk || sub.name;
        }


        const subSub = path.length >= 3 ? sub?.subcategories?.find(ss => ss.name === path[2]) : undefined;
        if (subSub) {
            subSubCategory = lang === 'ru' ? subSub.ru || subSub.name : subSub.uk || subSub.name;
        }
    }
    
    let allLots = []

    try {
        allLots = await getFilterLot(category, subCategory, subSubCategory, city, search.minPrice, search.maxPrice, state)
    } catch (error) {
        console.log('лотов нету')
        allLots = []
    }

  return (
    <div className='flex justify-start items-start w-full h-full pb-2 relative gap-2'>
        <Filter />
        <Catalog category={langCategory} subCategory={langSubCategory} subSubCategory={langSubSubCategory} city={city} lots={allLots}/>
    </div>
  )
}

