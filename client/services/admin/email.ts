import { BASE_URL, dataReturn } from "../utils";

export async function sendEmail(to:string, subject:string, html:string) {
    const res = await fetch(`${BASE_URL}/email/sendEmail`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({to, subject, html}),
        credentials: 'include',
    })

    return dataReturn(res)
}

export async function comparisonCode(code:string) {
    const res = await fetch(`${BASE_URL}/email/comparisonCode`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({code})
    })

    return dataReturn(res)
}

export async function sendCode(email:string, type:string) {
    const res = await fetch(`${BASE_URL}/email/sendCode`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, type})
    })

    return dataReturn(res)
}

export async function newTemplate(subject:string, html:string) {
    const res = await fetch(`${BASE_URL}/email/newTemplate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({subject, html}),
        credentials: 'include',
    })

    return dataReturn(res)
}

export async function Newsletter(subject:string, html:string) {
    const res = await fetch(`${BASE_URL}/email/Newsletter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({subject, html}),
        credentials: 'include',
    })

    return dataReturn(res)
}

export async function getAllTemplate() {
    const res = await fetch(`${BASE_URL}/email/getAllTemplate`, {
        method: 'GET',
        credentials: 'include',
    })

    return dataReturn(res)
}

export async function getTemplateById(id:string) {
    const res = await fetch(`${BASE_URL}/email/getTemplateById/${id}`, {
        method: 'GET',
        credentials: 'include',
    })

    return dataReturn(res)
}