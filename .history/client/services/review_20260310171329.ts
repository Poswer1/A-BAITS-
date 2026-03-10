import { BASE_URL, dataReturn } from "./utils"

export async function newReview(token:string, to:string, comment:string) {
    const res = await fetch(`${BASE_URL}/payment/buyLot`, {
        method: 'PATCH',
        headers: {
           'Authorization': `Bearer ${token}`, 
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({to, price})
    })

    return dataReturn(res)
}