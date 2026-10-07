import TranslationProvider from "../context/TranslationProvider";


import ukHeader from '../../public/translations/uk/header.json'
import ukFooter from '../../public/translations/uk/footer.json'
import ukLot from '../../public/translations/uk/lot.json'
import ukMain from '../../public/translations/uk/main.json'
import ukNavbar from '../../public/translations/uk/navbar.json'
import ukCreateLot from '../../public/translations/uk/createLot.json'
import ukGlobal from '../../public/translations/uk/global.json'
import ukProfile from '../../public/translations/uk/profile.json'
import ukChat from '../../public/translations/uk/chat.json'
import ukReview from '../../public/translations/uk/review.json'
import ukCatalog from '../../public/translations/uk/catalog.json'
import ukAuth from '../../public/translations/uk/auth.json'
import ukAdmin from '../../public/translations/uk/admin.json'
import ukViolations from '../../public/translations/uk/violations.json'
import ukBlog from '../../public/translations/uk/blog.json'
import ukRules from '../../public/translations/uk/rules.json'

import ruHeader from '../../public/translations/ru/header.json'
import ruFooter from '../../public/translations/ru/footer.json'
import ruLot from '../../public/translations/ru/lot.json'
import ruMain from '../../public/translations/ru/main.json'
import ruNavbar from '../../public/translations/ru/navbar.json'
import ruCreateLot from '../../public/translations/ru/createLot.json'
import ruGlobal from '../../public/translations/ru/global.json'
import ruProfile from '../../public/translations/ru/profile.json'
import ruChat from '../../public/translations/ru/chat.json'
import ruReview from '../../public/translations/ru/review.json'
import ruCatalog from '../../public/translations/ru/catalog.json'
import ruAuth from '../../public/translations/ru/auth.json'
import ruAdmin from '../../public/translations/ru/admin.json'
import ruViolations from '../../public/translations/ru/violations.json'
import ruBlog from '../../public/translations/ru/blog.json'
import ruRules from '../../public/translations/ru/rules.json'

import ClientLayout from "./clientLayout";
import { serializeJsonLd, SITE_NAME, SITE_ORIGIN, siteUrl } from "@/utils/seo";

type Lang = 'uk' | 'ru'

const translationsMap = {
    uk: {
        header: ukHeader,
        createLot: ukCreateLot,
        footer: ukFooter,
        lot: ukLot,
        main: ukMain,
        navbar: ukNavbar,
        global: ukGlobal,
        profile: ukProfile,
        chat: ukChat,
        review: ukReview,
        catalog: ukCatalog,
        auth: ukAuth,
        admin:ukAdmin,
        violations:ukViolations,
        blog:ukBlog,
        rules:ukRules
    },
    ru: {
        header: ruHeader,
        createLot: ruCreateLot,
        footer: ruFooter,
        lot: ruLot,
        main: ruMain,
        navbar: ruNavbar,
        global: ruGlobal,
        profile: ruProfile,
        chat: ruChat,
        review: ruReview,
        catalog: ruCatalog,
        auth: ruAuth,
        admin:ruAdmin,
        violations:ruViolations,
        blog: ruBlog,
        rules: ruRules
    }
}

type LangLayoutProps = {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
    const { lang: routeLang } = await params
    const lang = (routeLang === 'ru' ? 'ru' : 'uk') as Lang
    const messages = translationsMap[lang]
    const siteStructuredData = [
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": `${SITE_ORIGIN}/#organization`,
            name: SITE_NAME,
            url: SITE_ORIGIN,
            logo: siteUrl('/images/logo.png'),
        },
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${siteUrl(`/${lang}`)}#website`,
            name: SITE_NAME,
            url: siteUrl(`/${lang}`),
            inLanguage: lang === 'ru' ? 'ru-RU' : 'uk-UA',
            publisher: { "@id": `${SITE_ORIGIN}/#organization` },
        },
    ]

    return (
        <TranslationProvider messages={messages}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializeJsonLd(siteStructuredData) }}
            />
            <ClientLayout>
                {children}
            </ClientLayout>
        </TranslationProvider>
    )
}