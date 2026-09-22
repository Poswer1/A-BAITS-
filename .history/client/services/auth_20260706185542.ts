import { BASE_URL, authHeaders, dataReturn } from "./utils"

function clearClientAuth() {
    if (typeof window === 'undefined') return

    localStorage.removeItem('token')
    window.dispatchEvent(new Event('auth-change'))
}

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
    if (typeof window === 'undefined') return false

    const hasLocalToken = !!localStorage.getItem('token')
    if (!hasLocalToken) return false

    try {
        const res = await fetch(`${BASE_URL}/auth/getStatusAuth`, {
            method: 'GET',
            headers: authHeaders(),
            credentials: 'include',
        })

        const data = await res.json().catch(() => ({ isLoggedIn: false }))

        if (!res.ok || !data?.isLoggedIn) {
            await logout()
            return false
        }

        return true
    } catch (error) {
        console.error('Ошибка проверки авторизации:', error)
        await logout()
        return false
    }
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
  clearClientAuth()

  try {
    await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })
  } catch (error) {
    console.error('Ошибка выхода из системы:', error)
  }
}
