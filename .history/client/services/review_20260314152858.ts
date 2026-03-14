import { BASE_URL, dataReturn } from "./utils"

export async function newReview(token:string, to:string, comment:string, rating:number) {
    const res = await fetch(`${BASE_URL}/review/newReview`, {
        method: 'POST',
        headers: {
           'Authorization': `Bearer ${token}`, 
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({to, comment, rating})
    })

    return dataReturn(res)
}

export async function getReviewUser(name:string, page:number) {

    type Params = {
        name?: string
        page?: number
    }

    const params:Params = new URLSearchParams()

}