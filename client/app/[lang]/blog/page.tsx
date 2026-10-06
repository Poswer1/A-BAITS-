import BlogCatalog from '@/components/blog/blogCatalog'
import { getAllBlog } from '@/services/blog'
import React from 'react'


export default async function page() {

  const allBlog = await getAllBlog()

  return (
    <BlogCatalog allBlog={allBlog}/>
  )
}
