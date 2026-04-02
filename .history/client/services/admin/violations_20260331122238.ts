import { BASE_URL, dataReturn } from "../utils";

export async function getAllViolations(token:string) {
    const res = await fetch(`${BASE_URL}/violations/getAllViolations`, {
        method: 'GET',
        
    })
}