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