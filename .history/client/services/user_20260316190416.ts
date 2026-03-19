import { BASE_URL, dataReturn } from "./utils" 

export async function getUserById() {

    
    const res = await fetch(`${BASE_URL}/user/getUserById`, {
        method: 'GET',
        credentials: 'include' // говорит отпровлять куки
    })
    
    return dataReturn(res)

}

export async function updateUser(formData:FormData) {
    const res = await fetch(`${BASE_URL}/user/updateProfile`, {
        method: 'PATCH',
        body: formData,
        credentials: 'include' // говорит отпровлять куки
    })

    return dataReturn(res)
}

export async function getUserByName(name: string) {
    const res = await fetch(`${BASE_URL}/user/getUserByName/${name}`, {
        method: 'GET'
    })

    return dataReturn(res)
}