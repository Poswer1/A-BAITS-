import type { Metadata } from 'next'
import { noIndexMetadata } from '@/utils/seo'

export const metadata: Metadata = noIndexMetadata(
  'Вход и регистрация',
  'Вход, регистрация и восстановление доступа к аккаунту A-BAITS.',
)

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children
}
