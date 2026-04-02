import { BASE_URL, dataReturn } from "../utils";

export async function getLotsBySearch(token:string, search:string) {
    const res = await fetch(`${BASE_URL}/ActionOnTheLots/getLotsBySearch?search=${search}`, {
        method: 'GET',
        headers: {
        'Authorization': `Bearer ${token}`
        },
         cache: 'no-store'
    })

    return dataReturn(res)
}