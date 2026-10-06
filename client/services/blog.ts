import { BASE_URL, dataReturn } from "./utils"

export async function getAllBlog() {
    const res = await fetch(`${BASE_URL}/blog/getAllBlog`, {
        method: 'GET'
    })

    return dataReturn(res)
}

export async function getBlogBySlug(slug:string) {
    const res = await fetch(`${BASE_URL}/blog/getBlogBySlug/${slug}`, {
        method: 'GET'
    })

    return dataReturn(res)
}