import { BASE_URL, authHeaders, dataReturn } from "./utils"


export async function register(email:string, password:string, name:string) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password, name})
    })

    return dataReturn(res)
}

export async function getStatusAuth() {
    const res = await fetch(`${BASE_URL}/auth/getStatusAuth`, {
        method: 'GET',
        headers: authHeaders(),
        credentials: 'include',// говорит отпровлять куки
    })

    if (!res.ok && (res.status === 401 || res.status === 403)) {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token')
            document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        }
        return false
    }

    const data = await res.json();
    const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('token')

    if (!data.isLoggedIn || !hasToken) {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token')
            document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        }
        return false
    }

    return true
}

export async function login(email:string, password:string) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // важно: чтобы браузер сохранил и отправлял cookie с токеном
        body: JSON.stringify({email, password})
    })

    return dataReturn(res)
}
