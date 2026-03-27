import { BASE_URL, dataReturn } from "./utils" 

export async function getUserById(token:string, id?:string) {

    let url = ''
    if(id) {
        url = `${BASE_URL}/user/getUserById?id=${id}`
    } else {
        url = `${BASE_URL}/user/getUserById`
    }


    const res = await fetch(url, {
        method: 'GET',
        credentials: 'include' // говорит отпровлять куки
    })
    
    return dataReturn(res)

}

export async function updateUser(token:string, formData:FormData) {
    const res = await fetch(`${BASE_URL}/user/updateProfile`, {
        method: 'PATCH',
        body: formData,
        headers: {
        'Authorization': `Bearer ${token}`
        },
        // credentials: 'include' // говорит отпровлять куки
    })

    return dataReturn(res)
}

export async function getUserByName(name: string) {
    const res = await fetch(`${BASE_URL}/user/getUserByName/${name}`, {
        method: 'GET'
    })

    return dataReturn(res)
}