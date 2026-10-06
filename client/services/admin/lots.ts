import { BASE_URL, dataReturn } from "../utils";

export async function getLotsBySearch(token:string, search: string = '', page: number = 1, sort: string = 'createdAt', order: string = 'desc', status: string = '') {
    const params = new URLSearchParams()
    params.set('page', page.toString())
    params.set('sort', sort)
    params.set('order', order)
    if (search) params.set('search', search)
    if (status) params.set('status', status)

    const res = await fetch(`${BASE_URL}/ActionOnTheLots/getLotsBySearch?${params}`, {
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