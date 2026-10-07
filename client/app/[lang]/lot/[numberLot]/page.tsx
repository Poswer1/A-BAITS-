import { notFound } from 'next/navigation'
import LotDetails from '@/components/lot/lotDetails'
import { getLot } from '@/services/lot'
import type { LotTypes } from '@/types/types'
import type { Metadata } from 'next'
import { localizedMetadata, noIndexMetadata, absoluteImageUrl, serializeJsonLd, siteUrl, truncateDescription } from '@/utils/seo'

interface LotPageProps {
  params: Promise<{ lang: string; numberLot: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

async function getLotOrNull(numberLot: string): Promise<LotTypes | null> {
  try {
    return await getLot(numberLot) as LotTypes
  } catch (error) {
    if (error instanceof Error && error.message.includes('LotNotFound')) return null
    throw error
  }
}

export async function generateMetadata({ params, searchParams }: LotPageProps): Promise<Metadata> {
  const [{ lang, numberLot }, query] = await Promise.all([params, searchParams])
  const lot = await getLotOrNull(numberLot)
  if (!lot) {
    return noIndexMetadata(
      lang === 'ru' ? 'Товар не найден' : 'Товар не знайдено',
      lang === 'ru' ? 'Запрашиваемый лот недоступен.' : 'Запитаний лот недоступний.',
    )
  }

  const description = truncateDescription(lot.descriptions, lot.name)
  const metadata = localizedMetadata({
    lang,
    title: lot.name,
    description,
    path: `/lot/${encodeURIComponent(lot.lotNumber)}`,
    image: lot.images?.[0],
  })
  if (lot.status !== 'Active' || Object.keys(query).length > 0) {
    return {
      ...metadata,
      robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
    }
  }
  return metadata
}

export default async function LotPage({ params }: LotPageProps) {
  const { lang, numberLot } = await params
  const lot = await getLotOrNull(numberLot)

  if (!lot) notFound()

  const productStructuredData = lot.status === 'Active'
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: lot.name,
        description: truncateDescription(lot.descriptions, lot.name),
        image: (lot.images || []).filter(Boolean).map(absoluteImageUrl),
        sku: lot.lotNumber,
        category: [lot.category, lot.subCategory, lot.subSubCategory].filter(Boolean).join(' / '),
        offers: {
          "@type": "Offer",
          url: siteUrl(`/${lang}/lot/${encodeURIComponent(lot.lotNumber)}`),
          priceCurrency: "UAH",
          price: lot.startPrice,
          availability: "https://schema.org/InStock",
        },
      }
    : null

  return (
    <>
      {productStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(productStructuredData) }}
        />
      )}
      <LotDetails lot={lot} />
    </>
  )
}
