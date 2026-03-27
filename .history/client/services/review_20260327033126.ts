import { BASE_URL, dataReturn } from "./utils"

export async function newReview(token:string, to:string, comment:string, rating:number, lotId:string) {
    const res = await fetch(`${BASE_URL}/review/newReview`, {
        method: 'POST',
        credentials: 'include', // говорит отпровлять куки
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify({to, comment, rating, lotId})
    })

    return dataReturn(res)
}

export async function getRandomReview(id:string) {
    const res = await fetch(`${BASE_URL}/review/randomReview/${id}`, {
        method: 'GET'
    })

    return dataReturn(res)
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