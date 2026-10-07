import { getLotFrom1UAH, getNewLot, getPopularLot, getTopLot } from "@/services/lot";
import Banner from "@/components/main/banner";
import Lots from "@/components/main/lots";
import type { Metadata } from "next";
import { localizedMetadata, noIndexMetadata } from "@/utils/seo";

export const dynamic = 'force-dynamic';

interface HomeProps {
  params: Promise<{ lang: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params, searchParams }: HomeProps): Promise<Metadata> {
  const [{ lang }, query] = await Promise.all([params, searchParams])
  if (Object.keys(query).length > 0) {
    return noIndexMetadata(
      'A-BAITS',
      lang === 'ru' ? 'Рыболовный онлайн-аукцион A-BAITS.' : 'Рибальський онлайн-аукціон A-BAITS.',
    )
  }

  return localizedMetadata({
    lang,
    title: lang === 'ru' ? 'Рыболовный онлайн-аукцион' : 'Рибальський онлайн-аукціон',
    description: lang === 'ru'
      ? 'Покупайте и продавайте рыболовные товары на аукционе A-BAITS. Новые лоты, торги и предложения от рыболовов.'
      : 'Купуйте та продавайте рибальські товари на аукціоні A-BAITS. Нові лоти, торги та пропозиції від рибалок.',
    path: '/',
  })
}

export default async function Home() {

  const [topLot, newLot, lotFrom1UAH, popularLot] = await Promise.all([
    getTopLot().catch(() => []),
    getNewLot().catch(() => []),
    getLotFrom1UAH().catch(() => []),
    getPopularLot().catch(() => []),
  ])

  return (

    <div className="flex flex-col justify-start items-center gap-10 min-h-screen overflow-x-hidden">
        <Banner />
        <Lots allLot={topLot} mode="topLot"/>
        <Lots allLot={lotFrom1UAH} mode="1hryvnia"/>
        <Lots allLot={newLot} mode="newLots"/>
        <Lots allLot={popularLot} mode="popular"/>
    </div>

  );
}
