import { useTranslation } from "@/app/context/TranslationProvider"
import { button } from "@/styles/global"
import { hover } from "@/styles/style"
import { Calendar, Eye } from "lucide-react"
import { getRelativeTime } from "../ui/relativeTime"
import { useParams } from "next/navigation"
import AvatarBlock from "../ui/avatar"
import { BlogTypes } from "@/types/types"
import Link from "next/link"

interface BlogCardProps {
    blog:BlogTypes
}

export default function BlogCard({blog}:BlogCardProps) {
    
    const BASE_URL = process.env.NEXT_PUBLIC_URL
    const params = useParams()
    const lang = params.lang as string
    const {t} = useTranslation()

  return (
    <Link href={`/${lang}/blog/${blog.slug}`} className={`${hover} flex flex-col justify-start items-center lg:w-1/3 xl:w-1/4 p-2 text-black`}>
      <img src={`${BASE_URL}${blog.images}`} className="w-full object-cover h-65 rounded-xl border border-gray-200"/>
      <div className="flex justify-between flex-col w-full lg:h-55 2xl:h-45">
        <div className="p-2">
            <h1 className="text-lg">{blog.title.length > 35 ? blog.title.slice(0, 35) + '...' : blog.title}</h1>
            <span className="text-sm text-gray-500">{blog.descriptions.length >= 80 ? blog.descriptions.slice(0, 80) + '...' : blog.descriptions }</span>
            <div className="flex justify-start items-center gap-1 my-2">
              <AvatarBlock avatar={blog.author?.avatar} size="30"/>
              <span className="text-sm">{blog.author?.name}</span>
            </div>
            <div className="flex justify-start items-center gap-5">
              <span className="text-gray-500 flex gap-1 text-sm"><Calendar size={20}/>{getRelativeTime(blog.createdAt, lang)}</span>
              <span className="text-gray-500 flex gap-1 text-sm"><Eye size={20}/>10</span>
            </div>
        </div>
      </div>
    </Link>
  )
}

