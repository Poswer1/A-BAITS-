import { BASE_URL, dataReturn } from "./utils" 

export async function getUserById(token:string, id?:string) {

    let url = ''
    if(id) {
        url = `${BASE_URL}/user/getUserById?id=${id}`
    } else {
        url = `${BASE_URL}/user/getUserById`
    }

    const options: RequestInit = {
        method: 'GET',
    };

    if (token) {
    options.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

     const res = await fetch(url, options);
    
    return dataReturn(res)

}

export async function updateUser(token:string, formData:FormData) {
    const res = await fetch(`${BASE_URL}/user/updateProfile`, {
        method: 'PATCH',
        body: formData,
        // credentials: 'include', // говорит отпровлять куки
        headers: {
            'Authorization': `Bearer ${token}`
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