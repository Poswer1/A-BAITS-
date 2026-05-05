import { BASE_URL, dataReturn } from "../utils";

export async function getAllViolations(token:string, page: number = 1, sort: string = 'createdAt', order: string = 'desc') {
    const params = new URLSearchParams()
    params.set('page', page.toString())
    params.set('sort', sort)
    params.set('order', order)

    const res = await fetch(`${BASE_URL}/violations/getAllViolations?${params}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return dataReturn(res)
}
