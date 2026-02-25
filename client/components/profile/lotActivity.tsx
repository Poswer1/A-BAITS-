import { useTranslation } from "@/app/context/TranslationProvider"
import { loadingBlock } from "@/styles/global"
import { lotListClass, pageContainerClass } from "@/styles/profile/profile"
import Loading from "../utils/loadig"
import LotCard from "../lotCard"
import Sidebar from "./sidebar"

interface LotActivityProps {
    loading:boolean
    active:string,
    setActive: (t:string) => void
    filterLots:any
    mode:string
}

export default function LotActivity({loading, active, setActive, filterLots, mode}: LotActivityProps) {

    const {t} = useTranslation()

  return (
    <div className={pageContainerClass}> 
      {loading ? (
        <div className={loadingBlock}>
          <Loading /> 
        </div>
      ): (
      <> 
        <h1 className="text-2xl mb-5">{mode === 'buy' ? t('profile', 'buy') : t('profile', 'sell')} | {active === 'active' ? t('profile', 'active') : active === 'archive' ? t('profile', 'archived') : active === 'completed' ? t('profile', 'completed') : t('profile', 'sold')} {t('global', 'lot')}</h1>
        <div className="w-full flex justify-start items-start gap-5">
          <Sidebar mode={mode} active={active} setActive={setActive}/>
          <div className={lotListClass}>
            {filterLots.map((lot:any) => (
              <LotCard lot={lot}/> 
            ))}
          </div>
        </div>
      </>
      )}
    </div>
  )
}

