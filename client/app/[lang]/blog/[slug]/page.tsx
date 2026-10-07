import BlogBySlug from '@/components/blog/blogBySlug'
import { getBlogBySlug } from '@/services/blog'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { BlogTypes } from '@/types/types'
import { absoluteImageUrl, localizedMetadata, noIndexMetadata, serializeJsonLd, siteUrl, SITE_ORIGIN, truncateDescription } from '@/utils/seo'

interface pageProps {
    params: Promise<{ lang: string; slug: string }>
    searchParams: Promise<Record<string, string | string[] | undefined>>
}

async function getBlog(slug: string): Promise<BlogTypes | null> {
    try {
        return await getBlogBySlug(slug) as BlogTypes
    } catch (error) {
        if (error instanceof Error && error.message.includes('BlogNotFound')) return null
        throw error
    }
}

export async function generateMetadata({ params, searchParams }: pageProps): Promise<Metadata> {
    const [{ lang, slug }, query] = await Promise.all([params, searchParams])
    const blog = await getBlog(slug)
    if (!blog) {
        return noIndexMetadata(
            lang === 'ru' ? 'Статья не найдена' : 'Статтю не знайдено',
            lang === 'ru' ? 'Запрашиваемая статья недоступна.' : 'Запитана стаття недоступна.',
        )
    }

    const metadata = localizedMetadata({
        lang,
        title: blog.title,
        description: truncateDescription(blog.descriptions, blog.title),
        path: `/blog/${encodeURIComponent(blog.slug)}`,
        image: blog.images,
        type: 'article',
    })
    if (Object.keys(query).length > 0) {
        return { ...metadata, robots: { index: false, follow: true, googleBot: { index: false, follow: true } } }
    }
    return metadata
}

export default async function page({params}: pageProps) {
    const { lang, slug } = await params
    const blog = await getBlog(slug)
    if (!blog) notFound()

    const articleStructuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blog.title,
        description: truncateDescription(blog.descriptions, blog.title),
        image: blog.images ? absoluteImageUrl(blog.images) : undefined,
        datePublished: new Date(blog.createdAt).toISOString(),
        inLanguage: lang === 'ru' ? 'ru-RU' : 'uk-UA',
        mainEntityOfPage: siteUrl(`/${lang}/blog/${encodeURIComponent(blog.slug)}`),
        publisher: {
            "@type": "Organization",
            name: "A-BAITS",
            url: SITE_ORIGIN,
        },
    }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleStructuredData) }}
      />
      <BlogBySlug blog={blog}/>
    </>
  )
}
