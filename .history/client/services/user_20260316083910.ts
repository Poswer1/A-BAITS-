import { BASE_URL, dataReturn } from "./utils" 

export async function getUserById() {
    const res = await fetch(`${BASE_URL}/user/getUserById`, {
        method: 'GET',
        credentials: 'include' // говорит отпровлять куки
    })
    
    return dataReturn(res)

}

export async function updateUser(params:type) {
    
}

export async function getUserByName(name: string) {
    const res = await fetch(`${BASE_URL}/user/getUserByName/${name}`, {
        method: 'GET'
    })

    return dataReturn(res)
}