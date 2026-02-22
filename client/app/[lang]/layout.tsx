import TranslationProvider from "../context/TranslationProvider";


import ukHeader from '../../public/translations/uk/header.json'
import ukFooter from '../../public/translations/uk/footer.json'
import ukLot from '../../public/translations/uk/lot.json'
import ukMain from '../../public/translations/uk/main.json'
import ukNavbar from '../../public/translations/uk/navbar.json'
import ukCreateLot from '../../public/translations/uk/createLot.json'
import ukGlobal from '../../public/translations/uk/global.json'
import ukProfile from '../../public/translations/uk/profile.json'

import ruHeader from '../../public/translations/ru/header.json'
import ruFooter from '../../public/translations/ru/footer.json'
import ruLot from '../../public/translations/ru/lot.json'
import ruMain from '../../public/translations/ru/main.json'
import ruNavbar from '../../public/translations/ru/navbar.json'
import ruCreateLot from '../../public/translations/ru/createLot.json'
import ruGlobal from '../../public/translations/ru/global.json'
import ruProfile from '../../public/translations/ru/profile.json'
import ClientLayout from "./clientLayout";

const translationsMap = {
    uk: {
        header: ukHeader,
        createLot: ukCreateLot,
        footer: ukFooter,
        lot: ukLot,
        main: ukMain,
        navbar: ukNavbar,
        global: ukGlobal,
        profile: ukProfile
    },
    ru: {
        header: ruHeader,
        createLot: ruCreateLot,
        footer: ruFooter,
        lot: ruLot,
        main: ruMain,
        navbar: ruNavbar,
        global: ruGlobal,
        profile: ruProfile
    }
}

export default async function LangLayout({children, params}: {children: React.ReactNode; params: { lang: string }}) {
    
    const Params = await params
    const lang = Params.lang

    const messages = translationsMap[lang] ||  translationsMap.uk

    return (
        <TranslationProvider messages={messages}>
            <ClientLayout>
              {children}
            </ClientLayout>
        </TranslationProvider>
    )
}