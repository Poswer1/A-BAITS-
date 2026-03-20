import { NextApiRequest, NextApiResponse } from "next"
import { BASE_URL, dataReturn } from "./utils"


export async function register(email:string, password:string) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password})
    })

    return dataReturn(res)
}

export async function hendler(req: NextApiRequest, res: NextApiResponse) {
    const token = req.cookies.token

    
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