import { BASE_URL, dataReturn } from "./utils"

export async function buyNow(token:string, ) {
    const res = await fetch(`${BASE_URL}/payment/buyLot`, {
        method: 'PATCH',
        headers: {
           'Authorization': `Bearer ${token}`, 
        },
        body: {}
    })
}