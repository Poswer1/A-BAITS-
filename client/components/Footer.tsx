'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import { hover } from "@/styles/style"
import Image from "next/image"

function Footer() {

  const column = 'flex flex-col justify-center items-start text-white w-1/5 gap-2'

  const { t } = useTranslation()

  const sections = [
    {
      text: t('footer', 'footer-info'), 
      link: [
        { text: t('footer', 'footer-info-forum'), link: '' },
        { text: t('footer', 'footer-info-articles'), link: '' }
      ]
    },
    {
      text: t('footer', 'footer-navigation'), 
      link: [
        { text: t('footer', 'footer-navigation-new'), link: '' },
        { text: t('footer', 'footer-navigation-from1'), link: '' },
        { text: t('footer', 'footer-navigation-top'), link: '' }
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
    <div className="flex justify-start items-center w-full bg-[#0F0F0F]  border-t">
      <div className="flex justify-start items-start w-[90%] gap-20">
        <div className={`${column} h-full p-10 relative`}>
           <Image src={'/images/Footer/logo.png'} alt="" width={150} height={150} className="w-[150px] h-auto"/>
            <span className="text-white">© 2026  A-BAITS UKRAINE | All rights reserved</span>
        </div>
        {sections.map((item, idx) => (
          <div className={`${column} p-10`} key={idx}>
            <h1 className="font-bold text-orange-600">{item.text}</h1>
            {item.link.map((linkItem, linkIdx) => (
              <span className={hover} key={linkIdx}>{linkItem.text}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Footer
