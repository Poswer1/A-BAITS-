import { useTranslation } from "@/app/context/TranslationProvider"
import { block, Blockinput, nameInput } from "@/styles/createLot"
import { hover } from "@/styles/style"

interface StateSectionsProps {
    stateLot:string | string[],
    setStateLot: (t: any) => void,
    mode:string
    error?: string
}

export default function StateSections({stateLot, setStateLot, mode, error}:StateSectionsProps) {

    const {t} = useTranslation() 

     const statesLot = [
        {
            lang: mode === 'state' ? 'new' : 'novaPost',
            state: mode === 'state'
            ? t('createLot','createLot-state-new')
            : t('createLot','create-delivary-np'),
        },
        {
            lang: mode === 'state' ? 'used' : 'ukrPost',
            state: mode === 'state'
            ? 'Б/У'
            : 'Укрпошта',
        },
        {
            lang: mode === 'state' ? 'needsRepairs' : 'pickup',
            state: mode === 'state'
            ? t('createLot','createLot-state-NeedsRenovation')
            : t('createLot','create-delivary-pickup'),
        },
        {
            lang: mode === 'state' ? 'forSpare' : 'none',
            state: mode === 'state'
            ? t('createLot','createLot-state-ForSpareParts')
            : '',
        },
        ]

        const handleSelect = (value: string) => {
            if (mode === 'state') {
                setStateLot(value)
            } else {
                setStateLot((prev: string[]) => {
                    if (prev.includes(value)) {
                        return prev.filter(item => item !== value)
                    } else {
                        return [...prev, value]
                    }
                })
            }
        }

  return (
    <div className={block}>
        <div className={Blockinput}>
            <span className={`${nameInput} ${error ? 'text-red-600 font-semibold' : ''}`}>{mode === 'state' ? t('createLot','createLot-state-title') : t('createLot','create-delivary-title')}</span>
            <div className={`flex overflow-x-auto w-full justify-start items-center gap-5 p-2 rounded-md ${error ? 'border-2 border-red-600 bg-red-600/10' : ''}`}>
                {statesLot.map((state, index) => (
                    <>
                    <span key={index} className={`whitespace-nowrap ${hover} ${index === 3 && mode !=='state' && 'hidden'} ${stateLot.includes(state.lang) && 'bg-orange-600 text-white'} bg-gray-100 p-2 w-40 text-center rounded-md`} onClick={() => handleSelect(state.lang)}>{state.state}</span>
                    </>
                 ))}
            </div>{error && <span className='text-red-600 text-sm'>{error}</span>}</div>
    </div>
  )
}


