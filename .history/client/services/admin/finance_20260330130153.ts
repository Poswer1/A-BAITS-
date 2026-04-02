import { BASE_URL, dataReturn } from "../utils";

export async function getAllTransactions(token:string) {
    const response = await fetch(`${BASE_URL}/finance/getAllTransactions`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return dataReturn(response);
}