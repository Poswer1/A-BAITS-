import Link from 'next/link'
import { categoriesWithIcons } from '@/category/category'
import locations from '@/data/citiesUK.json'
import { getCatalogPageSeo } from '@/utils/catalogSeo'

interface CatalogNavigationProps {
  lang: string
  slug: string[]
}

interface NavigationItem {
  name: string
  href: string
}

export default function CatalogNavigation({ lang, slug }: CatalogNavigationProps) {
  const pageSeo = getCatalogPageSeo(slug, lang)
  if (!pageSeo) return null

  const language = lang === 'ru' ? 'ru' : 'uk'
  const segments = slug.map(segment => decodeURIComponent(segment).toLowerCase())
  const city = locations.find(location => location.name.toLowerCase() === segments.at(-1))

  if (segments.length === 1 && segments[0] === 'alllots') {
    return (
      <nav aria-label={language === 'ru' ? 'Навигация по каталогу' : 'Навігація каталогом'} className="w-full px-3 py-2 text-sm text-gray-600">
        <Link href={`/${language}`}>{language === 'ru' ? 'Главная' : 'Головна'}</Link>
        <span aria-hidden="true"> / </span>
        <span>{language === 'ru' ? 'Все товары' : 'Усі товари'}</span>
      </nav>
    )
  }

  const categorySegments = city ? segments.slice(0, -1) : segments
  const category = categoriesWithIcons.find(item => item.name === categorySegments[0])
  if (!category) return null

  const items: NavigationItem[] = [
    { name: language === 'ru' ? 'Главная' : 'Головна', href: `/${language}` },
    {
      name: language === 'ru' ? category.ru || category.name : category.uk || category.name,
      href: `/${language}/${category.name}`,
    },
  ]

  let subcategory: (typeof category.subcategories)[number] | undefined
  if (categorySegments.length > 1) {
    subcategory = category.subcategories.find(item => item.name === categorySegments[1])
    if (!subcategory) return null
    items.push({
      name: language === 'ru' ? subcategory.ru || subcategory.name : subcategory.uk || subcategory.name,
      href: `/${language}/${category.name}/${subcategory.name}`,
    })
  }

  if (categorySegments.length > 2) {
    const subSubcategory = subcategory?.subcategories.find(item => item.name === categorySegments[2])
    if (!subSubcategory || !subcategory) return null
    items.push({
      name: language === 'ru' ? subSubcategory.ru || subSubcategory.name : subSubcategory.uk || subSubcategory.name,
      href: `/${language}/${category.name}/${subcategory.name}/${subSubcategory.name}`,
    })
  }

  const childCategories = categorySegments.length === 1
    ? category.subcategories.map(item => ({
        name: language === 'ru' ? item.ru || item.name : item.uk || item.name,
        href: `/${language}/${category.name}/${item.name}`,
      }))
    : categorySegments.length === 2 && subcategory
      ? subcategory.subcategories.map(item => ({
          name: language === 'ru' ? item.ru || item.name : item.uk || item.name,
          href: `/${language}/${category.name}/${subcategory.name}/${item.name}`,
        }))
      : []

  if (city) {
    items.push({
      name: language === 'ru' ? city.ru || city.name : city.uk || city.name,
      href: pageSeo.path,
    })
  }

  return (
    <nav aria-label={language === 'ru' ? 'Навигация по каталогу' : 'Навігація каталогом'} className="w-full px-3 py-2 text-sm text-gray-600">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-1">
            {index > 0 && <span aria-hidden="true">/</span>}
            {index === items.length - 1
              ? <span aria-current="page">{item.name}</span>
              : <Link href={item.href} className="hover:text-orange-600">{item.name}</Link>}
          </li>
        ))}
      </ol>
      {childCategories.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {childCategories.map(item => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-orange-600">{item.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
