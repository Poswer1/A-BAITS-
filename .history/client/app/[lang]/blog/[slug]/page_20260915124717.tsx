import BlogBySlug from '@/components/blog/blogBySlug'
import { getBlogBySlug } from '@/services/blog'

interface pageProps {
    params: {
        slug:string
    }
}

export default async function page({params}: pageProps) {

    const Params = await params
    const slug = Params.slug as string
    let blog = []

    try {
        blog = await getBlogBySlug(slug)   
    } catch (error:any) {
    }

  return (
    <BlogBySlug blog={blog}/>
  )
}

