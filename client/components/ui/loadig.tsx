import { useTranslation } from "@/app/context/TranslationProvider"

export default function Loading() {

  const {t} = useTranslation()

  return (
    <div className="text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-orange-600 mx-auto"></div>
        <h2 className="text-zinc-900 dark:text-white mt-4">{t('global', 'loading')}...</h2>
    </div>
  )
}

