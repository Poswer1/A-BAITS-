
import { BASE_URL, dataReturn } from "./utils"

export async function createLot(token:string, formData:FormData) {
    const res = await fetch(`${BASE_URL}/lot/createLot`, {
        method: 'POST',
        headers: {
        'Authorization': `Bearer ${token}`
        },
        // credentials: 'include', // говорит отпровлять куки
        body: formData
    })

    return dataReturn(res)
}

export async function getLotByUser(name:string, page:number) {
    const params = new URLSearchParams()

    if(name) params.append('name', name)
    if(page) params.append('page', page.toString())

    const res = await fetch(`${BASE_URL}/lot/getLotByUser?${params}`, {
        method: 'GET'
    })    
    return dataReturn(res)
}

export async function getMyLots(token:string, slug:string, mode:string, page?:number) {

    const params = new URLSearchParams()

    if(slug) params.append('status', slug)
    if(mode) params.append('mode', mode)
    if(page) params.append('page', page.toString())


    const res = await fetch(`${BASE_URL}/lot/getMyLots?${params}`, {
        method: 'GET',
        headers: {
        'Authorization': `Bearer ${token}`
        }
    })

    return dataReturn(res)
}

export async function getFilterLot(category?:string, subCategory?:string, subSubCategory?:string, city?:string, minPrice?:string, maxPrice?:string, state?:string[], sort?:string, search?:string, page?:number) {
    const params = new URLSearchParams()

    if(category !== undefined)params.set('category', category)
    if(subCategory !== undefined)params.set('subCategory', subCategory)
    if(subSubCategory !== undefined)params.set('subSubCategory', subSubCategory)
    if(city !== undefined)params.set('city', city)
    if(sort)params.set('sort', sort)
    if(minPrice !== undefined)params.set('minPrice', minPrice)    
    if(maxPrice !== undefined)params.set('maxPrice', maxPrice)
    if(search !== undefined)params.set('search', search)
    if(page !== undefined)params.set('page', page.toString())
    
    if (state?.length) {
    (Array.isArray(state) ? state : [state])
        .forEach(s => params.append('state', s))
    }

    const res = await fetch(`${BASE_URL}/lot/getFilterLot?${params}`, {
        method: 'GET',
    })

    return dataReturn(res)

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

export async function myHistoryLot() {
    const token = localStorage.getItem('token')
    if(!token) return
    const res = await fetch(`${BASE_URL}/lot/myHistoryLot`, {
        method: 'GET',
        headers: {
        'Authorization': `Bearer ${token}`
        },
        // credentials: 'include' // говорит отпровлять куки
    })

    return dataReturn(res)
}