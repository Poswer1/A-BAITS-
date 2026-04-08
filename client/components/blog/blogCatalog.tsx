'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import BlogCard from "../card/blogCard"
import { BlogTypes } from "@/types/types"

interface BlogCatalogProps {
    allBlog: BlogTypes[]
}

export default function BlogCatalog({allBlog}:BlogCatalogProps) {

    const {t} = useTranslation()

  return (
    <div className="flex justify-center items-start w-full min-h-screen">
        <div className="flex flex-col justify-start w-[90%] h-full mt-5 md:mt-10">
            <h1 className="text-3xl font-bold text-black mb-5"><span className="text-orange-600">{t('blog', 'Статьи')}</span> {t('blog', 'and news')}</h1>
            <div className="flex flex-wrap w-full gap-2 md:gap-0">
                {allBlog.map((blog) => (
                    <BlogCard key={blog._id} blog={blog}/>
                ))}
            </div>
        </div>
    </div>
  )
}

