import { BASE_URL, authHeaders, dataReturn } from "./utils"


export async function register(email:string, password:string, name:string, code:string) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password, name, code})
    })

    return dataReturn(res)
}

export async function getStatusAuth() {
    const res = await fetch(`${BASE_URL}/auth/getStatusAuth`, {
        method: 'GET',
        credentials: 'include',
    });

    if(!res.ok) {
        return false;
    }

    const data = await res.json();

    return data.isLoggedIn;
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

export async function logout() {
  await fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  window.dispatchEvent(new Event('auth-change'));
}
