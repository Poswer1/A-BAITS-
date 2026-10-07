import type { Metadata } from 'next'
import { noIndexMetadata } from '@/utils/seo'

export const metadata: Metadata = noIndexMetadata(
  'Оставить отзыв',
  'Форма отзыва доступна пользователям аукциона A-BAITS.',
)

export default function ReviewLayout({ children }: { children: React.ReactNode }) {
  return children
}
