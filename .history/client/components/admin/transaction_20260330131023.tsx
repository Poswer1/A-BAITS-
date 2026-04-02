import { useTranslation } from "@/app/context/TranslationProvider"
import { TransactionTypes } from "@/types/types"
import AvatarBlock from "../ui/avatar"


interface TransactionProps {
    allTransactions: TransactionTypes[]
}

export default function Transaction({allTransactions}: TransactionProps) {

    const {t} = useTranslation()

  return (
    <div className="flex flex-col justify-start items-start gap-4">
        <h1 className="text-xl">{t('admin', 'transactions')}</h1>
        <div className="flex flex-col justify-start items-start w-full">
            {allTransactions.map(transaction => (
                <div key={transaction._id} className="flex justify-start items-start w-full bg-white border-t border-b border-gray-200 p-2">
                    <AvatarBlock avatar=""/>
                </div>
            ))}
        </div>
    </div>
  )
}

