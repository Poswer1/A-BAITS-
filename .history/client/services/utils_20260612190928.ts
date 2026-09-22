export const BASE_URL = process.env.NEXT_PUBLIC_URL

export function isTokenExpired(token: string) {
    try {
        const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))
        return typeof payload.exp === 'number' && payload.exp * 1000 < Date.now()
    } catch {
        return false
    }
}

export function logout() {
    if (typeof window === 'undefined') return

    localStorage.removeItem('token')
    window.dispatchEvent(new Event('auth-change'))

    const segments = window.location.pathname.split('/').filter(Boolean)
    const locale = segments.length > 0 && segments[0] !== 'auth' ? segments[0] : ''
    const loginPath = `${window.location.origin}/${locale ? `${locale}/` : ''}auth/login`

    window.location.href = loginPath
}

export function authHeaders(): HeadersInit {
    if (typeof window === 'undefined') return {}

    const token = localStorage.getItem('token')
    if (!token) return {}
    if (isTokenExpired(token)) {
        logout()
        return {}
    }

    return { Authorization: `Bearer ${token}` }
}

export async function dataReturn (res:any) {
    const text = await res.text()
    const data = text ? JSON.parse(text) : null

    if (!res.ok) {
        if (res.status === 401) {
            logout()
            throw new Error(data?.message || 'Требуется авторизация')
        }
        throw new Error(data?.message || 'Ошибка res')
    }

    return data;
}
