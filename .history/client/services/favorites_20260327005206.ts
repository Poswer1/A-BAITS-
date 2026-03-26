import { BASE_URL, dataReturn, getAuthHeaders } from "./utils";

export async function addFavorite(id:string) {
    const res = await fetch(`${BASE_URL}/favorites/addFavorite/${id}`, {
        method: 'PATCH',
        credentials: 'include', // говорит отпровлять куки
        headers: getAuthHeaders()
    })
    return dataReturn(res)
}

export async function getFavorite() {
    const res = await fetch(`${BASE_URL}/favorites/getFavorite`, {
        method: 'GET',
        credentials: 'include', // говорит отпровлять куки
        headers: getAuthHeaders()
    })
    return dataReturn(res)
}