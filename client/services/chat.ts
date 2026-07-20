import { BASE_URL, dataReturn } from "./utils";

export async function getMyChats() {
    const res = await fetch(`${BASE_URL}/chat/getMyChat`, {
        method: 'GET',
        credentials: 'include',// говорит отпровлять куки
    })

    return dataReturn(res)
}

export async function getChatId(userId:string, lotId:string) {
    const res = await fetch(`${BASE_URL}/chat/getChatId/${userId}/${lotId}`, {
        method: 'GET',
        credentials: 'include',// говорит отпровлять куки
    })

    return dataReturn(res)
}

export async function inviteAdmin(id:string) {
    const res = await fetch(`${BASE_URL}/chat/inviteAdmin/${id}`, {
        method: 'POST',
        credentials: 'include',
    })

    return dataReturn(res)
}

export async function confirmInvite(id:string, token:string) {
    const res = await fetch(`${BASE_URL}/chat/confirmInvite/${id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return dataReturn(res)
}