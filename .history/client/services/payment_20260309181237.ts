import { BASE_URL, dataReturn } from "./utils"

export async function buyNow(token:string, lotId:string, price?:number) {
    const res = await fetch(`${BASE_URL}/payment/buyLot`, {
        method: 'PATCH',
        headers: {
           'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({lotId, price})
    })

    
}