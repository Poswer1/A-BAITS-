'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import { hover } from "@/styles/style"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

function Footer() {

  const column = 'flex flex-col justify-center items-start text-white w-full md:w-1/5 gap-2 p-10'

  const params = useParams()
  const { t } = useTranslation()
  const lang = params.lang as string

  const sections = [
    {
      text: t('footer', 'footer-info'), 
      link: [
        { text: t('footer', 'footer-info-forum'), link: `https://t.me/auctionbaitsUA` },
        { text: t('footer', 'footer-info-articles'), link: `/${lang}/blog` }
      ]
    },
    {
      text: t('footer', 'footer-navigation'), 
      link: [
        { text: t('footer', 'footer-navigation-new'), link: `/${lang}/allLots?sort=newFirst` },
        { text: t('footer', 'footer-navigation-from1'), link: `/${lang}/allLots?maxPrice=1` },
        { text: t('footer', 'footer-navigation-top'), link: `/${lang}/allLots?sort=moreBids` }
      ]
    },
    {
      text: t('footer', 'footer-support'), 
      link: [
        { text: t('footer', 'footer-support-contact'), link: '' },
        { text: t('footer', 'footer-support-privacy'), link: '' }
      ]
    },
    {
      text: t('footer', 'footer-contacts'), 
      link: [
        { text: t('footer', 'footer-contacts-phone'), link: '' },
        { text: t('footer', 'footer-contacts-email'), link: '' },
        { text: t('footer', 'footer-contacts-address'), link: '' }
      ]
    },
  ]

  return (
    <div className="flex justify-start items-start w-full bg-[#0F0F0F] z-10">
      <div className="flex flex-col md:flex-row justify-start items-start w-[90%] lg:gap-10 2xl:gap-20">
        <div className={`${column} h-full relative`}>
          <Image src={'/images/Footer/logo.png'} alt="" width={150} height={150} className="md:w-[200px] lg:w-[150px] h-auto"/>
          <span className="text-white text-sm">© 2026  A-BAITS UKRAINE | All rights reserved</span>
        </div>
        {sections.map((item, idx) => (
          <div className={`${column}`} key={idx}>
            <h1 className="font-bold text-orange-600">{item.text}</h1>
            {item.link.map((linkItem, linkIdx) => (
              <Link href={linkItem.link} className={`${hover} 2xl:text-base lg:text-sm`} key={linkIdx}>{linkItem.text}</Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Footer
