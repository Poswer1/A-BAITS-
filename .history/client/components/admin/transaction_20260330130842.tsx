import { useTranslation } from "@/app/context/TranslationProvider"
import { TransactionTypes } from "@/types/types"


interface TransactionProps {
    allTransactions: TransactionTypes[]
}

export default function Transaction({allTransactions}: TransactionProps) {

    const {t} = useTranslation()

  return (
    <div className="flex flex-col justify-start items-start gap-4">
        <h1 className="text-xl">{t('admin', 'transactions')}</h1>
        <div className="flex flex-col justify-start items-start">
            {allTransactions.map(transaction => (
                <div className="flex justify-start items-start">
                </div>
            ))}
        </div>
    </div>
  )
}

