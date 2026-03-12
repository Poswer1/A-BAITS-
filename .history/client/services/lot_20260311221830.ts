import { BASE_URL, dataReturn } from "./utils"

export async function createLot(formData:FormData, token:string) {
    const res = await fetch(`${BASE_URL}/lot/createLot`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData
    })

    return dataReturn(res)
}

export async function getFilterLot(category?:string, subCategory?:string, subSubCategory?:string, city?:string, minPrice?:string, maxPrice?:string, state?:string[]) {
    const params = new URLSearchParams()

    if(category !== undefined)params.set('category', category)
    if(subCategory !== undefined)params.set('subCategory', subCategory)
    if(subSubCategory !== undefined)params.set('subCategory', subSubCategory)
}

export async function getAllLot() {
    const res = await fetch(`${BASE_URL}/lot/getAllLot`, {
        method: 'GET'
    })

    return dataReturn(res)
}

export async function getLot(numberLot:string) {
    const res = await fetch(`${BASE_URL}/lot/getLot/${numberLot}`, {
        method: 'GET'
    })

    return dataReturn(res)
}

export async function myHistoryLot(token:string) {
    const res = await fetch(`${BASE_URL}/lot/myHistoryLot`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })

    return dataReturn(res)
}