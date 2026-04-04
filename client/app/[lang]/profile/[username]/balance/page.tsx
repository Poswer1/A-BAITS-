import Balance from "@/components/profile/balance";
import { getMyTransactions } from "@/services/admin/finance";
import { cookies } from 'next/headers';

export default async function page() {
  
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if(!token) {
    console.log('ТОКЕН НЕ ПОЛУЧЕН')
    return
  }

  const data = await getMyTransactions(token)

  return (
    <Balance allTransaction={data.allTransactions} currentBalance={Number(data.currentBalance)}/>
  )
}


