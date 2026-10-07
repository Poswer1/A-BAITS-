import type { Metadata } from 'next'

export const SITE_ORIGIN = 'https://a-baits.com.ua'
export const SITE_NAME = 'A-BAITS'
export const SUPPORTED_LANGUAGES = ['uk', 'ru'] as const

type Language = (typeof SUPPORTED_LANGUAGES)[number]

interface LocalizedMetadataOptions {
  lang: string
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
}

function getLanguage(lang: string): Language {
  return lang === 'ru' ? 'ru' : 'uk'
}

export function siteUrl(path: string) {
  return new URL(path, SITE_ORIGIN).toString()
}

export function localizedMetadata({
  lang,
  title,
  description,
  path,
  image,
  type = 'website',
}: LocalizedMetadataOptions): Metadata {
  const language = getLanguage(lang)
  const canonicalPath = `/${language}${path === '/' ? '' : path}`
  const canonical = siteUrl(canonicalPath)
  const imageUrl = image ? absoluteImageUrl(image) : siteUrl('/images/logo.png')

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        uk: siteUrl(`/uk${path === '/' ? '' : path}`),
        ru: siteUrl(`/ru${path === '/' ? '' : path}`),
        'x-default': siteUrl(`/uk${path === '/' ? '' : path}`),
      },
    },
    openGraph: {
      type,
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: language === 'ru' ? 'ru_RU' : 'uk_UA',
      alternateLocale: language === 'ru' ? ['uk_UA'] : ['ru_RU'],
      images: [{ url: imageUrl, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export function noIndexMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: {},
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  }
}

export function absoluteImageUrl(image: string) {
  return new URL(image, process.env.NEXT_PUBLIC_URL || SITE_ORIGIN).toString()
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

export function getLocalizedRouteAlternates(path: string) {
  return {
    uk: siteUrl(`/uk${path}`),
    ru: siteUrl(`/ru${path}`),
  }
}

export function truncateDescription(value: string | undefined, fallback: string) {
  const normalized = value?.replace(/\s+/g, ' ').trim()
  if (!normalized) return fallback
  return normalized.length > 160 ? `${normalized.slice(0, 157).trimEnd()}...` : normalized
}
