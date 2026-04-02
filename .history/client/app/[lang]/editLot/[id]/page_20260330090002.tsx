import LotForm from '@/components/createLot/lotForm'
import { getLot } from '@/services/lot'
import { getRoleUser } from '@/services/user';
import { cookies } from 'next/headers';

interface pageProps {
  params: {
    id:string
  }
}

export default async function page({params} : pageProps) {

  const param = await params
  const id = param.id as string

    if(!id) {
      console.log('айди не найден')
      return
    }
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if(!token) {
        console.log('ТОКЕН НЕ ПОЛУЧЕН')
        return
    }

    let mode: 'edit' | 'editAdmin' = 'edit'

    const roleUser = await getRoleUser(token)
    if(!roleUser) return
    if(roleUser === 'admin') {
      mode = 'editAdmin'
    }
    const initialDate = []
  

  return (
    <LotForm mode={mode} initialData={initialDate}/>
  )
}

