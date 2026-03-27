import { BASE_URL, dataReturn } from "./utils";

export async function addFavorite(token:string, id:string) {
    const res = await fetch(`${BASE_URL}/favorites/addFavorite/${id}`, {
        method: 'PATCH',
        headers: {
        'Authorization': `Bearer ${token}`
        },
        credentials: 'include' // говорит отпровлять куки
    })
    return dataReturn(res)
}

export async function getFavorite() {
    const res = await fetch(`${BASE_URL}/favorites/getFavorite`, {
        method: 'GET',
        credentials: 'include' // говорит отпровлять куки
    })
    return dataReturn(res)
}