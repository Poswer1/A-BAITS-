import { categoriesWithIcons } from '@/category/category';
import ListLocation from '../../../data/citiesUK.json'
import Catalog from '@/components/catalog/catalog';
import Filter from '@/components/catalog/filter';
import { getFilterLot } from '@/services/lot';
import type { Metadata } from 'next'
import { getCatalogPageSeo } from '@/utils/catalogSeo'
import { localizedMetadata, noIndexMetadata } from '@/utils/seo'
import CatalogNavigation from '@/components/catalog/catalogNavigation'

interface pageProps {
params: Promise<{
  lang: string;
  slug?: string | string[];
}>;
searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ params, searchParams }: pageProps): Promise<Metadata> {
  const [route, query] = await Promise.all([params, searchParams])
  const lang = route.lang === 'ru' ? 'ru' : 'uk'
  const slug = Array.isArray(route.slug) ? route.slug : route.slug ? [route.slug] : []
  const pageSeo = getCatalogPageSeo(slug, lang)

  if (!pageSeo) {
      return noIndexMetadata(
          lang === 'ru' ? 'Поиск рыболовных товаров' : 'Пошук рибальських товарів',
          lang === 'ru' ? 'Результаты поиска на аукционе A-BAITS.' : 'Результати пошуку на аукціоні A-BAITS.',
      )
  }

  const { indexable, canonicalPath, ...localizedPageSeo } = pageSeo
  const metadata = localizedMetadata({
    lang,
    ...localizedPageSeo,
    path: canonicalPath || localizedPageSeo.path,
  })
  if (Object.keys(query).length > 0 || indexable === false) {
      return { ...metadata, robots: { index: false, follow: true, googleBot: { index: false, follow: true } } }
  }
  return metadata
}

export default async function page({params, searchParams}: pageProps) {

  const [param, search] = await Promise.all([params, searchParams])

    const lang = param.lang as string
    const page = Number(search.page)

    const state: string[] = search.state
    ? (Array.isArray(search.state) ? search.state : [search.state])
        .filter((value): value is string => typeof value === 'string')
        .map(s => decodeURIComponent(s))
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
    let searchValue: string | undefined;


    const path = [...slug];
    const categoryData = categoriesWithIcons.find(c => c.name === path[0]);
    const cityData = ListLocation.find(c => c.name.toLowerCase() === path[path.length - 1].toLowerCase());

    if (cityData) {
        city = slug[slug.length -1]
        langCity = lang === 'ru' ? cityData.ru || cityData.name : cityData.uk || cityData.name;
        path.pop(); // убираем город
    }

    if (categoryData) {
        if (path.length >= 1) {
            category = slug[0]
            langCategory = lang === 'ru' ? categoryData.ru || categoryData.name : categoryData.uk || categoryData.name;
        }

        const sub = path.length >= 2 ? categoryData.subcategories.find(s => s.name === path[1]) : undefined;
        if (sub) {
            subCategory = slug[1]
            langSubCategory = lang === 'ru' ? sub.ru || sub.name : sub.uk || sub.name;
        }


        const subSub = path.length >= 3 ? sub?.subcategories?.find(ss => ss.name === path[2]) : undefined;
        if (subSub) {
            subSubCategory = slug[2]
            langSubSubCategory = lang === 'ru' ? subSub.ru || subSub.name : subSub.uk || subSub.name;
        }
    }

    if(!categoryData) {
        searchValue = slug[0]
    }
    
    const allLots = await getFilterLot(
        category,
        subCategory,
        subSubCategory,
        city,
        typeof search.minPrice === 'string' ? search.minPrice : undefined,
        typeof search.maxPrice === 'string' ? search.maxPrice : undefined,
        state,
        typeof search.sort === 'string' ? search.sort : undefined,
        searchValue,
        Number.isNaN(page) ? undefined : page,
    )

  return (
    <div className='flex flex-col justify-start items-start w-full h-full relative'>
        <CatalogNavigation lang={lang} slug={slug}/>
        <div className='flex justify-start items-start w-full h-full relative'>
            <Filter maxPriceLot={allLots.maxPriceLot}/>
            <Catalog
            category={langCategory}
            subCategory={langSubCategory}
            subSubCategory={langSubSubCategory}
            city={langCity}
            lots={allLots.lots}
            total={allLots.totalLot}
            searchValue={searchValue?.toString() || ''}/>
        </div>
    </div>
  )
}
