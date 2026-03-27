import { BASE_URL, dataReturn } from "./utils"

export async function buyNow(lotId:string, value:number) {
    const res = await fetch(`${BASE_URL}/payment/buyLot`, {
        method: 'PATCH',
        credentials: 'include', // говорит отпровлять куки
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify({lotId, value})
    })

    return dataReturn(res)
}