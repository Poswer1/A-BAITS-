
import { BASE_URL, authHeaders, dataReturn } from "./utils"

export async function createLot(formData:FormData) {
    const res = await fetch(`${BASE_URL}/lot/createLot`, {
        method: 'POST',
        headers: authHeaders(),
        credentials: 'include',// говорит отпровлять куки
        body: formData
    })

    return dataReturn(res)
}

export async function viewsCount(lotId:string) {
    const res = await fetch(`${BASE_URL}/lot/viewsCount/${lotId}`, {
        method: "PATCH",
        headers: authHeaders(),
        credentials: 'include',
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

export async function getTopLot() {
    const res = await fetch(`${BASE_URL}/lot/getTopLot`, {
        method: 'GET',
        cache: 'no-store'
    })    
    return dataReturn(res)
}

export async function getLotFrom1UAH() {
    const res = await fetch(`${BASE_URL}/lot/getLotFrom1UAH`, {
        method: 'GET',
        cache: 'no-store'
    })    
    return dataReturn(res)
}

export async function getNewLot() {
    const res = await fetch(`${BASE_URL}/lot/getNewLot`, {
        method: 'GET',
        cache: 'no-store'
    })    
    return dataReturn(res)
}

export async function getPopularLot() {
    const res = await fetch(`${BASE_URL}/lot/getPopularLot`, {
        method: 'GET',
        cache: 'no-store'
    })    
    return dataReturn(res)
}

export async function updateLot(formData:FormData, id:string) {
    const res = await fetch(`${BASE_URL}/lot/updateLot/${id}`, {
        method: 'PATCH',
        headers: authHeaders(),
        credentials: 'include',
        body: formData
    })

    return dataReturn(res)
}

export async function getMyLots(token:string, slug:string, mode:string, page?:number, sort?:string) {

    const params = new URLSearchParams()

    if(slug) params.append('status', slug)
    if(mode) params.append('mode', mode)
    if(page) params.append('page', page.toString())
    if(sort) params.append('sort', sort.toString())
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

export async function deleteLot(id:string) {
    const res = await fetch(`${BASE_URL}/lot/deleteLot/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
        credentials: 'include',
    })

    return dataReturn(res)
}

export async function resumeLot(id:string) {
    const res = await fetch(`${BASE_URL}/lot/resumeLot/${id}`, {
        method: 'PATCH',
        headers: authHeaders(),
        credentials: 'include', 
    })
    return dataReturn(res)
}

export async function closeLot(id:string) {
    const res = await fetch(`${BASE_URL}/lot/closeLot/${id}`, {
        method: 'PATCH',
        headers: authHeaders(),
        credentials: 'include', 
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

export async function getMyAutoBid(numberLot:string) {
    const res = await fetch(`${BASE_URL}/lot/getMyAutoBid/${numberLot}`, {
        method: 'GET',
        headers: authHeaders(),
        credentials: 'include'
    })

    return dataReturn(res)
}

export async function myHistoryLot() {
    const res = await fetch(`${BASE_URL}/lot/myHistoryLot`, {
        method: 'GET',
        headers: authHeaders(),
        credentials: 'include' // говорит отпровлять куки
    })

    return dataReturn(res)
}
