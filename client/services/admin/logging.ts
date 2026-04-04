import { BASE_URL, dataReturn } from "../utils";

export async function getAllLogging(token:string) {
    const res = await fetch(`${BASE_URL}/logging/getAllLogs`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return dataReturn(res)
}