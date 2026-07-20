import Transaction from '@/components/admin/transaction';
import { getAllTransactions } from '@/services/admin/finance';
import { cookies } from 'next/headers';

export default async function page({searchParams}: {searchParams: {page?:string, sort?:string, order?:string}}) {

    const params = await searchParams
    const page = Number(params.page) || 1
    const sort = params.sort || 'createdAt'
    const order = params.order || 'desc'

    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if(!token) {
      console.log('токен не найден')
      return
    }
    const data = await getAllTransactions(token, page, sort, order);

  return (
    <Transaction allTransactions={data.transactions || []} total={data.total || 0} currentPage={page} currentSort={sort} currentOrder={order}/>
  )
}


