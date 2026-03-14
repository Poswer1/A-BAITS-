import { BASE_URL, dataReturn } from "./utils";

export async function addFavorite(token:string, id:string) {
    const res = await fetch(`${BASE_URL}/favorites/addFavorite/${id}`, {
        method: 'PATCH',
    })
}