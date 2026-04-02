import { BASE_URL, dataReturn } from "../utils";

export async function getLotsBySearch(search:string) {
    const res = await fetch(`${BASE_URL}/ActionOnTheLots/getLotsBySearch?`)
}