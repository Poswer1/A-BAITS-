export const BASE_URL = process.env.NEXT_PUBLIC_URL

export function clearAuthState() {
    if (typeof window === 'undefined') return

    localStorage.removeItem('token')
    document.cookie = 'token=; Max-Age=0; path=/'
    document.cookie = 'jwt=; Max-Age=0; path=/'
    window.dispatchEvent(new Event('auth-change'))
}

export function authHeaders(): HeadersInit {
    if (typeof window === 'undefined') return {}

    const token = localStorage.getItem('token')
    return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function dataReturn(res: any) {
    const text = await res.text()
    const data = text ? JSON.parse(text) : null

    if (!res.ok) {
        const message = data?.message || 'Ошибка res'
        const hadToken = typeof window !== 'undefined' && !!localStorage.getItem('token')

        if (hadToken && /token|jwt|expired|unauthorized|forbidden/i.test(message)) {
            clearAuthState()
            if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth/login')) {
                window.location.replace('/auth/login')
            }
        }

        throw new Error(message)
    }

    return data
}
