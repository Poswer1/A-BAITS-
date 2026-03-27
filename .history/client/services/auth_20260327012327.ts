import { NextApiRequest, NextApiResponse } from "next"
import { BASE_URL, dataReturn } from "./utils"


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
        // credentials: 'include', // говорит отпровлять куки
        
    })

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