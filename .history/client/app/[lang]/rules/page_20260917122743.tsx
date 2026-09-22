'use client'

import { useTranslation } from '@/app/context/TranslationProvider'

function RulesPage() {

    const {t} = useTranslation()
    const documentLines = t('rules', 'document').split('\n')

  return (
    <main className='flex justify-center w-full min-h-screen'>
      <article className="w-[90%] rounded-2xl bg-white m-5 md:m-10">
        <h1 className="text-3xl font-bold text-black">{t('rules', 'rulesTitle')}</h1>
        <div className="mt-8 space-y-3 text-gray-700">
          {documentLines.map((line, index) => {
            if (!line.trim()) return <div key={`space-${index}`} className="h-2" />
            if (/^## /.test(line)) {
              return <h2 key={line} className="pt-5 text-xl font-semibold text-gray-900">{line.slice(3)}</h2>
            }
            if (/^\*\*/.test(line)) {
              return <p key={line} className="leading-7">{line.replace(/^\*\*|\*\*$/g, '')}</p>
            }
            if (line.startsWith('- ')) {
              return <li key={line} className="ml-5 list-item list-disc leading-7">{line.slice(2)}</li>
            }
            return <p key={line} className="leading-7">{line}</p>
          })}
        </div>
      </article>
    </main>
  )
}

export default RulesPage
