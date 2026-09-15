import { notFound } from 'next/navigation'
import LotDetails from '@/components/lot/lotDetails'
import { getLot } from '@/services/lot'
import { LotTypes } from '@/types/types'

interface LotPageProps {
  params: Promise<{
    numberLot: string
  }>
}

export default async function LotPage({ params }: LotPageProps) {
  const { numberLot } = await params
  const lot = await getLot(numberLot).catch(() => null) as LotTypes | null

  if (!lot) notFound()

  return <LotDetails lot={lot} />
}
