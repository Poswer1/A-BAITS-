import Balance from "@/components/profile/balance";
import { getMyTransactions } from "@/services/admin/finance";
import { cookies } from 'next/headers';

export default async function page({searchParams}:{searchParams:{page:string}}) {
  const search = await searchParams
  const page = search.page || '1'

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if(!token) {
    console.log('ТОКЕН НЕ ПОЛУЧЕН')
    return
  }

  const data = await getMyTransactions(token, Number(page))

  return (
    <Balance allTransaction={data.allTransactions} totalTransactions={data.totalTransactions} currentBalance={Number(data.currentBalance)}/>
  )
}


