import { TransactionTypes } from "@/types/types"


interface TransactionProps {
    allTransactions: TransactionTypes[]
}

export default function Transaction() {

    const {t} = useT

  return (
    <div className="flex flex-col justify-start items-start">
        <h1></h1>
    </div>
  )
}

