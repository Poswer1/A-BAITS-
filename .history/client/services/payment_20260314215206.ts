import { BASE_URL, dataReturn } from "./utils"

export async function buyNow( lotId:string, price?:number) {
    const res = await fetch(`${BASE_URL}/payment/buyLot`, {
        method: 'PATCH',
        headers: {
           'Authorization': `Bearer ${token}`, 
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({lotId, price})
    })

    return dataReturn(res)
}