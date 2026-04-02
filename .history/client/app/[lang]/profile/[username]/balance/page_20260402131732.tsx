import Balance from "@/components/profile/balance";
import { cookies } from 'next/headers';

export default async function page() {
  
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if(!token) {
    console.log('ТОКЕН НЕ ПОЛУЧЕН')
    return
  }

  return (
    <Balance />
  )
}


