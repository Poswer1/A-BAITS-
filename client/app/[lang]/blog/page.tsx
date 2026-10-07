import BlogCatalog from '@/components/blog/blogCatalog'
import { getAllBlog } from '@/services/blog'
import React from 'react'
import type { Metadata } from 'next'
import { localizedMetadata } from '@/utils/seo'

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}): Promise<Metadata> {
  const [{ lang }, query] = await Promise.all([params, searchParams])
  const metadata = localizedMetadata({
    lang,
    title: lang === 'ru' ? 'Статьи о рыбалке и снастях' : 'Статті про риболовлю та снасті',
    description: lang === 'ru'
      ? 'Полезные статьи о рыбалке, приманках и снастях от сообщества A-BAITS.'
      : 'Корисні статті про риболовлю, приманки та снасті від спільноти A-BAITS.',
    path: '/blog',
  })
  if (Object.keys(query).length > 0) {
    return { ...metadata, robots: { index: false, follow: true, googleBot: { index: false, follow: true } } }
  }
  return metadata
}

export default async function page() {

  const allBlog = await getAllBlog()

  return (
    <BlogCatalog allBlog={allBlog}/>
  )
}
