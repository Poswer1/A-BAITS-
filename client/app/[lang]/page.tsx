import { getAllLot, getLotFrom1UAH, getNewLot, getPopularLot, getTopLot } from "@/services/lot";
import Banner from "@/components/main/banner";
import Lots from "@/components/main/lots";

export default async function Home() {

  const [topLot, newLot, lotFrom1UAH, popularLot] = await Promise.all([
    getTopLot().catch(() => []),
    getNewLot().catch(() => []),
    getLotFrom1UAH().catch(() => []),
    getPopularLot().catch(() => []),
  ])

  return (

    <div className="flex flex-col justify-start items-center gap-10 min-h-screen">
        <Banner />
        <Lots allLot={topLot} mode="topLot"/>
        <Lots allLot={lotFrom1UAH} mode="1hryvnia"/>
        <Lots allLot={newLot} mode="newLots"/>
        <Lots allLot={popularLot} mode="popular"/>
    </div>

  );
}
