import { getAllTransactions } from '@/services/admin/finance';
import { cookies } from 'next/headers';

export default async function page() {

    const transactions = await getAllTransactions();

  return (
    <div>
      
    </div>
  )
}


