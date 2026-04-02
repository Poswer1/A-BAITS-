import ControlOfViolations from '@/components/admin/ControlOfViolations'
import { getAllViolations } from '@/services/admin/violations'
import { cookies } from "next/headers"

export default async function page() {

    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if(!token) {
      console.log('токен не найден')
      return
    }
    const allViolations = await getAllViolations

  return (
    <ControlOfViolations />
  )
}

