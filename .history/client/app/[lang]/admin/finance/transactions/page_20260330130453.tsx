import Transaction from '@/components/admin/transaction';
import { getAllTransactions } from '@/services/admin/finance';
import { cookies } from 'next/headers';

export default async function page() {

    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if(!token) {
      console.log('токен не найден')
      return
    }
    const transactions = await getAllTransactions(token);

  return (
    <Transaction allTransactions={transactions} />
  )
}


