import { BASE_URL, dataReturn } from "./utils";

export async function getMyChats(token:string) {
    const res = await fetch(`${BASE_URL}/chat/getMyChat`, {
        method: 'GET',
        credentials: 'include' ,
        headers: {
        'Authorization': `Bearer ${token}`
        }// говорит отпровлять куки
    })

    return dataReturn(res)
}