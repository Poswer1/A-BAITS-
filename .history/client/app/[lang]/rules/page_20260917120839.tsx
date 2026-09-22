'use client'

import { useTranslation } from '@/app/context/TranslationProvider'

function RulesPage() {

    const {t} = useTranslation()

  return (
    <main className='flex justify-center w-full min-h-screen'>
      <article className="w-[90%] rounded-2xl bg-white ">
        <h1 className="text-3xl font-bold text-black"><span className='text-orange-600'>Правила</span> {t('rules', 'platform')}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600">{t('rules', 'intro')}</p>

        <div className="mt-8 space-y-8 text-gray-700">
          <RuleSection title={t('rules', 'generalTitle')} items={[t('rules', 'generalOne'), t('rules', 'generalTwo'), t('rules', 'generalThree')]} />
          <RuleSection title={t('rules', 'lotsTitle')} items={[t('rules', 'lotsOne'), t('rules', 'lotsTwo'), t('rules', 'lotsThree')]} />
          <RuleSection title={t('rules', 'biddingTitle')} items={[t('rules', 'biddingOne'), t('rules', 'biddingTwo'), t('rules', 'biddingThree')]} />
          <RuleSection title={t('rules', 'communicationTitle')} items={[t('rules', 'communicationOne'), t('rules', 'communicationTwo'), t('rules', 'communicationThree')]} />
          <RuleSection title={t('rules', 'violationsTitle')} items={[t('rules', 'violationsOne'), t('rules', 'violationsTwo')]} />

          <section>
            <h2 className="text-xl font-semibold text-gray-900">{t('rules', 'finalTitle')}</h2>
            <p className="mt-3 leading-7">{t('rules', 'finalText')}</p>
          </section>
        </div>
      </article>
    </main>
  )
}

function RuleSection({title, items}: {title: string; items: string[]}) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  )
}

export default RulesPage
