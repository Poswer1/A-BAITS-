import { categoriesWithIcons } from '@/category/category'
import locations from '@/data/citiesUK.json'

interface CatalogPageSeo {
  path: string
  title: string
  description: string
  indexable?: boolean
  canonicalPath?: string
}

export function getCatalogPageSeo(slug: string[], lang: string): CatalogPageSeo | null {
  const segments = slug.map(segment => decodeURIComponent(segment).toLowerCase())

  if (segments.length === 1 && segments[0] === 'alllots') {
    return lang === 'ru'
      ? {
          path: '/allLots',
          title: 'Все рыболовные товары на аукционе',
          description: 'Просматривайте все актуальные рыболовные товары и участвуйте в торгах на A-BAITS.',
        }
      : {
          path: '/allLots',
          title: 'Усі рибальські товари на аукціоні',
          description: 'Переглядайте актуальні рибальські товари та беріть участь у торгах на A-BAITS.',
        }
  }

  const city = locations.find(item => item.name.toLowerCase() === segments.at(-1))
  const categorySegments = city ? segments.slice(0, -1) : segments
  if (categorySegments.length < 1 || categorySegments.length > 3) return null

  const category = categoriesWithIcons.find(item => item.name === categorySegments[0])
  if (!category) return null

  const parts = [lang === 'ru' ? category.ru || category.name : category.uk || category.name]

  if (categorySegments.length > 1) {
    const subcategory = category.subcategories.find(item => item.name === categorySegments[1])
    if (!subcategory) return null
    parts.push(lang === 'ru' ? subcategory.ru || subcategory.name : subcategory.uk || subcategory.name)

    if (categorySegments.length > 2) {
      const subSubcategory = subcategory.subcategories.find(item => item.name === categorySegments[2])
      if (!subSubcategory) return null
      parts.push(lang === 'ru' ? subSubcategory.ru || subSubcategory.name : subSubcategory.uk || subSubcategory.name)
    }
  }

  if (city) {
    parts.push(lang === 'ru' ? city.ru || city.name : city.uk || city.name)
  }

  const canonicalSegments = [
    category.name,
    ...categorySegments.slice(1),
    ...(city ? [city.name] : []),
  ]
  const path = `/${canonicalSegments.join('/')}`
  const canonicalPath = `/${canonicalSegments.slice(0, categorySegments.length).join('/')}`
  const subject = parts.join(' — ')

  return lang === 'ru'
    ? {
        path,
        indexable: !city,
        canonicalPath,
        title: `${subject} — рыболовный аукцион`,
        description: `Покупайте и продавайте ${subject.toLowerCase()} на рыболовном онлайн-аукционе A-BAITS.`,
      }
    : {
        path,
        indexable: !city,
        canonicalPath,
        title: `${subject} — рибальський аукціон`,
        description: `Купуйте та продавайте ${subject.toLowerCase()} на рибальському онлайн-аукціоні A-BAITS.`,
      }
}
