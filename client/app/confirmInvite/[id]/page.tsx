
import { confirmInvite } from "@/services/chat";
import { getRoleUser } from "@/services/user"
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'

export default async function page({params}:{params:{id:string}}) {

    const Params = await params
    const lotId = Params.id as string

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if(!token) redirect('/uk')
    const data = await getRoleUser(token)
    if(data.role !== 'admin') return null
    const confirm = await confirmInvite(lotId, token)
    if(confirm.success) {
        console.log('regiredt')
        redirect(`/uk/profile/chat?id=${lotId}`)
    } else {
        console.log('regiredt main')
        redirect('/uk')
    }
}

