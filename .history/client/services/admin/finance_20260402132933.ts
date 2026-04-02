import { BASE_URL, dataReturn } from "../utils";

export async function getAllTransactions(token:string) {
    const res = await fetch(`${BASE_URL}/finance/getAllTransactions`, {
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

export async function getMyTransactions(token:string) {
    const res = await fetch(`${BASE_URL}/finance/getMyViolations`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return dataReturn(res)
}