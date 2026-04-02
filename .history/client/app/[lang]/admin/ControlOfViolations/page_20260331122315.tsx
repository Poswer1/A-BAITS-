import ControlOfViolations from '@/components/admin/ControlOfViolations'
import { cookies } from "next/headers"

async function page() {

    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if(!token) {
      console.log('токен не найден')
      return
    }

  return (
    <ControlOfViolations />
  )
}

export default page
