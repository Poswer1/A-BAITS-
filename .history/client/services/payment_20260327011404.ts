import { BASE_URL, dataReturn } from "./utils"

export async function buyNow(lotId:string, value:number) {
    const token = localStorage.getItem('token')
    if(!token) return
    const res = await fetch(`${BASE_URL}/payment/buyLot`, {
        method: 'PATCH',
        credentials: 'include', // говорит отпровлять куки
        headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({lotId, value})
    })

    return dataReturn(res)
}