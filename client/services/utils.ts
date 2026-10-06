export const BASE_URL = process.env.NEXT_PUBLIC_URL

export function authHeaders(): HeadersInit {
    if (typeof window === 'undefined') return {}

    const token = localStorage.getItem('token')
    return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function dataReturn (res:any) {
    const text = await res.text()
    const data = text ? JSON.parse(text) : null

     if(!res.ok) {
        throw new Error(data?.message || 'Ошибка res');
    }

    return data;
}
