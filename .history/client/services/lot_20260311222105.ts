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
    if(subSubCategory !== undefined)params.set('subSubCategory', subSubCategory)
    if(city !== undefined)params.set('city', city)
    if(minPrice !== undefined)params.set('minPrice', minPrice)    
    if(maxPrice !== undefined)params.set('maxPrice', maxPrice)
    
    if(state?.length !== 0) {
        Array.isArray(state)
        ? state.forEach(s => params.set('state', s))
        : params.set('state')
    }

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