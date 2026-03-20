import { useTranslation } from "@/app/context/TranslationProvider"
import { block, Blockinput, nameInput } from "@/styles/createLot"
import { hover } from "@/styles/style"

interface StateSectionsProps {
    stateLot:string,
    setStateLot: (t:string) => void
    mode:string
}

export default function StateSections({stateLot, setStateLot, mode}:StateSectionsProps) {

    const {t} = useTranslation() 

     const statesLot = [
      {state: mode === 'state' ? t('createLot','createLot-state-new') : t('createLot','create-delivary-np')},
      {state: mode === 'state' ? 'Б/У' : 'Укрпошта'},
      {state: mode === 'state' ? t('createLot','createLot-state-NeedsRenovation') : t('createLot','create-delivary-pickup')},
      {state: mode === 'state' ? t('createLot','createLot-state-ForSpareParts') : ''},
    ]

  return (
    <div className={block}>
        <div className={Blockinput}>
            <span className={nameInput}>{mode === 'state' ? t('createLot','createLot-state-title') : t('createLot','create-delivary-title')}</span>
            <div className="flex justify-start items-center gap-5">
                {statesLot.map((state, index) => (
                    <>
                    <span key={index} className={`${hover} ${index === 3 && mode !=='state' && 'hidden'} ${stateLot === state.state && 'bg-orange-600 text-white'} bg-gray-100 p-2 w-40 text-center rounded-md`} onClick={() => setStateLot(state.state)}>{state.state}</span>
                    </>
                 ))}
            </div>
        </div>
    </div>
  )
}


