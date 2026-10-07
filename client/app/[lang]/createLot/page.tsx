import LotForm from '@/components/createLot/lotForm'
import type { Metadata } from 'next'
import { noIndexMetadata } from '@/utils/seo'

export const metadata: Metadata = noIndexMetadata(
  'Создать лот',
  'Форма создания лота на аукционе A-BAITS.',
)

export default async function page() {

  return (
    <>
      <LotForm mode='create'/>
    </>
  )
}
