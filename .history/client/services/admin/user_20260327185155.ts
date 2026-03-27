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


export async function deleteUser(id:string) {
    const res = await fetch(`${BASE_URL}/ActionOnTheUser/deleteUser/${id}`, {
        method: 'DELETE',
        credentials: 'include', 
    })
}