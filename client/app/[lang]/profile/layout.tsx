import type { Metadata } from 'next'
import ProfileLayoutClient from './ProfileLayoutClient'
import { noIndexMetadata } from '@/utils/seo'

export const metadata: Metadata = noIndexMetadata(
  'Личный кабинет',
  'Личный кабинет пользователя A-BAITS.',
)

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <ProfileLayoutClient>{children}</ProfileLayoutClient>
}
