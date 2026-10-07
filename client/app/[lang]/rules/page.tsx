import type { Metadata } from 'next'
import RulesContent from '@/components/rules/rulesContent'
import { localizedMetadata, noIndexMetadata } from '@/utils/seo'

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
    title: lang === 'ru' ? 'Правила аукциона' : 'Правила аукціону',
    description: lang === 'ru'
      ? 'Правила использования рыболовного аукциона A-BAITS для покупателей и продавцов.'
      : 'Правила користування рибальським аукціоном A-BAITS для покупців і продавців.',
    path: '/rules',
  })

  if (Object.keys(query).length > 0) {
    return noIndexMetadata(metadata.title?.toString() || 'Правила A-BAITS', metadata.description || '')
  }
  return metadata
}

export default function RulesPage() {
  return <RulesContent />
}
