import { BASE_URL, authHeaders, dataReturn } from "./utils";

export async function addFavorite(id:string) {
    if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
        return { success: false }
    }

    try {
        const res = await fetch(`${BASE_URL}/favorites/addFavorite/${id}`, {
            method: 'PATCH',
            headers: authHeaders(),
            credentials: 'include', // говорит отпровлять куки
        })
        return await dataReturn(res)
    } catch (error) {
        if (error instanceof Error && /token|jwt|expired|unauthorized|forbidden/i.test(error.message)) {
            return { success: false }
        }
        throw error
    }
}

export async function getFavorite() {
    if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
        return []
    }

    try {
        const res = await fetch(`${BASE_URL}/favorites/getFavorite`, {
            method: 'GET',
            headers: authHeaders(),
            credentials: 'include', // говорит отпровлять куки
        })
        return await dataReturn(res)
    } catch (error) {
        if (error instanceof Error && /token|jwt|expired|unauthorized|forbidden/i.test(error.message)) {
            return []
        }
        throw error
    }
}