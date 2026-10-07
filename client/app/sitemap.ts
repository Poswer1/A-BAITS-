import type { MetadataRoute } from 'next'
import { categoriesWithIcons } from '@/category/category'
import { getAllBlog } from '@/services/blog'
import { getAllLot } from '@/services/lot'
import type { BlogTypes, LotTypes } from '@/types/types'
import { getLocalizedRouteAlternates, SITE_ORIGIN } from '@/utils/seo'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [allLots, allBlogs] = await Promise.all([
    getAllLot() as Promise<LotTypes[]>,
    getAllBlog() as Promise<BlogTypes[]>,
  ])

  const entries: MetadataRoute.Sitemap = []
  const addLocalizedPage = (path: string, lastModified?: Date) => {
    for (const lang of ['uk', 'ru']) {
      const localizedPath = `/${lang}${path}`
      entries.push({
        url: new URL(localizedPath, SITE_ORIGIN).toString(),
        lastModified,
        alternates: {
          languages: getLocalizedRouteAlternates(path),
        },
      })
    }
  }

  addLocalizedPage('')
  addLocalizedPage('/allLots')
  addLocalizedPage('/blog')
  addLocalizedPage('/rules')

  for (const category of categoriesWithIcons) {
    addLocalizedPage(`/${category.name}`)
    for (const subcategory of category.subcategories) {
      addLocalizedPage(`/${category.name}/${subcategory.name}`)
      for (const subSubcategory of subcategory.subcategories) {
        addLocalizedPage(`/${category.name}/${subcategory.name}/${subSubcategory.name}`)
      }
    }
  }

  for (const lot of allLots) {
    if (lot.status !== 'Active' || !lot.lotNumber) continue
    addLocalizedPage(`/lot/${encodeURIComponent(lot.lotNumber)}`, new Date(lot.createdAt))
  }

  for (const blog of allBlogs) {
    if (!blog.slug) continue
    addLocalizedPage(`/blog/${encodeURIComponent(blog.slug)}`, new Date(blog.createdAt))
  }

  return entries
}
