import { BASE_URL, dataReturn } from "../utils";

export async function getAllUser(token:string) {
    const res = await fetch(`${BASE_URL}/ActionOnTheUser/getAllUser`, {
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

export async function getCountRegisteredUsers(params:type) {
    
}

export async function getUserCount() {
    const res = await fetch(`${BASE_URL}/ActionOnTheUser/getCountUsers`, {
        method: 'GET',
        credentials: 'include',
    })

    return dataReturn(res)
}

export async function updateBalance(id:string, balance:number) {
    const res = await fetch(`${BASE_URL}/ActionOnTheUser/updateBalance/${id}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ balance })
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