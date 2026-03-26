export const BASE_URL = process.env.NEXT_PUBLIC_URL

export async function dataReturn (res:any) {
    const data = await res.json()

     if(!res.ok) {
        throw new Error(data.message || 'Ошибка res');
    }

    return data;
}