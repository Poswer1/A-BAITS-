import { useTranslation } from "@/app/context/TranslationProvider"
import { button, overlay } from "@/styles/global"
import { hover } from "@/styles/style"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function Success() {
  const params = useParams()
  const {t} = useTranslation()
  const lang = params.lang as string

  return (
    <div className={overlay}>
      <div className="bg-white px-20 py-10 flex flex-col justify-center items-center rounded-md relative">
        <div className="absolute inset-0 h-full bg-gradient-to-l from-orange-600/12 via-orange-600/8 to-transparent z-0"></div>
        <Image src={'/images/success/success.png'} alt="" width={200} height={200} className="w-60 h-80 object-cover z-10"/>
        <h1 className="text-black text-3xl font-bold z-10">{t('createLot', 'create-succes')} <span className="text-orange-600">{t('createLot', 'create-succesCreate')}!</span></h1>
        <Link href={`/${lang}`} className={`${button} ${hover} font-bold mt-5 z-10`}>{t('createLot', 'create-back')}</Link>
      </div>
    </div>
  )
}
