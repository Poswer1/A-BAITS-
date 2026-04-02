import { getAllLot } from "@/services/lot"
import { LotTypes } from "@/types/types"


export default async function page() {

  const listLots: LotTypes[] = []

  try {
    listLots = await getAllLot()
  } catch (error) {
    l
  }

  return (
    <div>
      
    </div>
  )
}
