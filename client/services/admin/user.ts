import { BASE_URL, dataReturn } from "../utils";

export async function getAllUser(token:string, page: number = 1, sort: string = 'createdAt', order: string = 'desc', search: string = '') {
    const params = new URLSearchParams()
    params.set('page', page.toString())
    params.set('sort', sort)
    params.set('order', order)
    if (search) params.set('search', search)

    const res = await fetch(`${BASE_URL}/ActionOnTheUser/getAllUser?${params}`, {
        method: 'GET',
        headers: {
        'Authorization': `Bearer ${token}`
        }
    })

    return dataReturn(res)
}

export async function changeStatus(id:string) {
    const res = await fetch(`${BASE_URL}/ActionOnTheUser/changeStatus/${id}`, {
        method: 'PATCH',
        credentials: 'include',
    })

    return dataReturn(res)
}

export async function TemporaryBlock(id:string, day:number) {
    const res = await fetch(`${BASE_URL}/ActionOnTheUser/TemporaryBlock/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
             'Content-Type': 'application/json'
        },
        body: JSON.stringify({day})
    })

    return dataReturn(res)
}

export async function getCountRegisteredUsers() {
    const res = await fetch(`${BASE_URL}/ActionOnTheUser/getCountRegisteredUsers`, {
        method: 'GET',
        credentials: 'include',
    })

    return dataReturn(res)
}

export async function getUserCount() {
    const res = await fetch(`${BASE_URL}/ActionOnTheUser/getCountUsers`, {
        method: 'GET',
        credentials: 'include',
    })

    return dataReturn(res)
}

export async function updateBalance(id:string, balance:number, balanceType:string) {
    const res = await fetch(`${BASE_URL}/ActionOnTheUser/updateBalance/${id}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ balance, balanceType})
    })

    return dataReturn(res)
}


export async function deleteUser(id:string) {
    const res = await fetch(`${BASE_URL}/ActionOnTheUser/deleteUser/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    })

    return dataReturn(res)
}