import { useTranslation } from "@/app/context/TranslationProvider"
import { TransactionTypes } from "@/types/types"


interface TransactionProps {
    allTransactions: TransactionTypes[]
}

export default function Transaction() {

    const {t} = useTranslation()

  return (
    <div className="flex flex-col justify-start items-start gap-4">
        <h1 className="text-xl">{t('admin', 'transactions')}</h1>
        <div className="flex flex-col justify-start items-start">
            {}
        </div>
    </div>
  )
}

