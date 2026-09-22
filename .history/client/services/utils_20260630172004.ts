export const BASE_URL = process.env.NEXT_PUBLIC_URL

function clearAuthState() {
    if (typeof window === 'undefined') return

    localStorage.removeItem('token')

    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

function redirectToLogin() {
    if (typeof window === 'undefined') return

    const pathname = window.location.pathname
    const segments = pathname.split('/').filter(Boolean)
    const lang = segments[0]
    const loginPath = ['uk', 'ru'].includes(lang) ? `/${lang}/auth/login` : '/uk/auth/login'

    if (!window.location.pathname.includes('/auth/login')) {
        window.location.assign(loginPath)
    }
}

export function authHeaders(): HeadersInit {
    if (typeof window === 'undefined') return {}

    const token = localStorage.getItem('token')
    return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function dataReturn (res: Response) {
    const text = await res.text()
    const data = text ? JSON.parse(text) : null

    if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
            clearAuthState()
            redirectToLogin()
        }

        throw new Error(data?.message || 'Ошибка res');
    }

    return data;
}
