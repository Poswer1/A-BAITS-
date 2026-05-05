import { BASE_URL, dataReturn } from "../utils";

export async function getAllTransactions(token:string, page: number = 1, sort: string = 'createdAt', order: string = 'desc') {
    const params = new URLSearchParams()
    params.set('page', page.toString())
    params.set('sort', sort)
    params.set('order', order)

    const res = await fetch(`${BASE_URL}/finance/getAllTransactions?${params}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return dataReturn(res);
}

export async function moneyReturn(transactionId:string, from:string, to:string, amount:number) {
    const res = await fetch(`${BASE_URL}/finance/returnMoney`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({transactionId, from, to, amount })
    });
    return dataReturn(res);
}

export async function getMyTransactions(token:string, page:number) {
    const res = await fetch(`${BASE_URL}/finance/getMyTransactions?page=${page}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return dataReturn(res)
}