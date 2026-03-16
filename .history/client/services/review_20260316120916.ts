import { BASE_URL, dataReturn } from "./utils"

export async function newReview(to:string, comment:string, rating:number) {
    const res = await fetch(`${BASE_URL}/review/newReview`, {
        method: 'POST',
        credentials: 'include', // говорит отпровлять куки
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({to, comment, rating})
    })

    return dataReturn(res)
}

export async function (params:type) {
    
}

export async function getReviewUser(name:string, page:number) {

    const params = new URLSearchParams()
    if(name !== undefined)params.append('name', name)
    if(page)params.append('page', page.toString())

    const res = await fetch(`${BASE_URL}/review/getReviewUser?${params}`, {
        method: 'GET'
    })

    return dataReturn(res)

}