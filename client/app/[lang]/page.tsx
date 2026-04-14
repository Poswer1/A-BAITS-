import { getAllLot, getLotFrom1UAH, getNewLot, getPopularLot, getTopLot } from "@/services/lot";
import Banner from "@/components/main/banner";
import Lots from "@/components/main/lots";

export default async function Home() {

  const topLot = await getTopLot()
  const newLot = await getNewLot()
  const lotFrom1UAH = await getLotFrom1UAH()
  const popularLot = await getPopularLot()

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
