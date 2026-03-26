import { BASE_URL, dataReturn } from "./utils";

export async function getMyChats() {
    const token = localStorage.getItem('token')
    if(!token) return
    const res = await fetch(`${BASE_URL}/chat/getMyChat`, {
        method: 'GET',
        headers: {
        'Authorization': `Bearer ${token}`
        },
        credentials: 'include' // говорит отпровлять куки
    })

    return dataReturn(res)
}