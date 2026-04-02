import { BASE_URL, dataReturn } from "./utils" 

export async function getUserById(id?:string) {

    let url = ''
    if(id) {
        url = `${BASE_URL}/user/getUserById?id=${id}`
    } else {
        url = `${BASE_URL}/user/getUserById`
    }

    const res = await fetch(url, {
        method: 'GET',
        credentials: 'include', // говорит отпровлять куки
    })
    
    return dataReturn(res)

}

export async function getRoleUser() {
    const res = await fetch(`${BASE_URL}/user/getRoleUser`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        } // говорит отпровлять куки
    })

    return dataReturn(res)
}

export async function updateUser(formData:FormData, id?:string) {

    let url = ''
    if(id) {
        url = `${BASE_URL}/user/updateProfile?id=${id}`
    } else {
        url = `${BASE_URL}/user/updateProfile`
    }

    const res = await fetch(url, {
        method: 'PATCH',
        body: formData,
        credentials: 'include', // говорит отпровлять куки
    })

    return dataReturn(res)
}

export async function getUserByName(name: string) {
    const res = await fetch(`${BASE_URL}/user/getUserByName/${name}`, {
        method: 'GET'
    })

    return dataReturn(res)
}