import { BASE_URL, dataReturn } from "./utils" 

export async function getUserById(token:string, id?: string) {
    const res = await fetch(`${BASE_URL}/user/getUserById${id ? `?id=${id}` : ''}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
    
    return dataReturn(res)

}

export async function getUserByName(name: string) {
    const res = await fetch(`${BASE_URL}/user/getUserByName/${name}`, {
        method: 'GET'
    })

    return dataReturn(res)
}