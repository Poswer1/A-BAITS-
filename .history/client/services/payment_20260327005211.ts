import { BASE_URL, dataReturn, getAuthHeaders } from "./utils"

export async function buyNow(lotId:string, value:number) {
    const res = await fetch(`${BASE_URL}/payment/buyLot`, {
        method: 'PATCH',
        credentials: 'include', // говорит отпровлять куки
        headers: {
           'Content-Type': 'application/json',
           ...getAuthHeaders()
        },
        body: JSON.stringify({lotId, value})
    })

    return dataReturn(res)
}