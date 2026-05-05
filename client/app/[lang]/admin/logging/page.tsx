import Logging from '@/components/admin/logging';
import { getAllLogging } from '@/services/admin/logging';
import { cookies } from 'next/headers';

export default async function page({searchParams}: {searchParams: {page?:string, sort?:string, order?:string}}) {

    const params = await searchParams
    const page = Number(params.page) || 1
    const sort = params.sort || 'createdAt'
    const order = params.order || 'desc'

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if(!token) {
      console.log('ТОКЕН НЕ ПОЛУЧЕН')
      return
    }

    const data = await getAllLogging(token, page, sort, order)

  return (
    <Logging allLogging={data.logs || []} total={data.total || 0} currentPage={page} currentSort={sort} currentOrder={order}/>
  )
}

