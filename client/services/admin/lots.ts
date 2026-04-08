import { BASE_URL, dataReturn } from "../utils";

export async function getLotsBySearch(token:string, search:string) {
    const res = await fetch(`${BASE_URL}/ActionOnTheLots/getLotsBySearch?search=${search}`, {
        method: 'GET',
        headers: {
        'Authorization': `Bearer ${token}`
        },
    })

    return dataReturn(res)
}


export async function getLotsCount() {
    const res = await fetch(`${BASE_URL}/ActionOnTheLots/getLotsCount`, {
        method: 'GET',
        credentials: 'include',
    })

    return dataReturn(res)
}

export async function getAllTurnover() {
    const res = await fetch(`${BASE_URL}/ActionOnTheLots/getAllTurnover`, {
        method: 'GET',
        credentials: 'include',
    })

    return dataReturn(res)
}