import { BASE_URL, dataReturn } from "./utils";

export async function addFavorite(id:string) {
    const token = localStorage.getItem('token')
    if(!token) return
    const res = await fetch(`${BASE_URL}/favorites/addFavorite/${id}`, {
        method: 'PATCH',
        headers: {
        'Authorization': `Bearer ${token}`
        },
        // credentials: 'include' // говорит отпровлять куки
    })
    return dataReturn(res)
}

export async function getFavorite() {
    const token = localStorage.getItem('token')
    if(!token) return
    const res = await fetch(`${BASE_URL}/favorites/getFavorite`, {
        method: 'GET',
        headers: {
        'Authorization': `Bearer ${token}`
        },
        // credentials: 'include' // говорит отпровлять куки
    })
    return dataReturn(res)
}