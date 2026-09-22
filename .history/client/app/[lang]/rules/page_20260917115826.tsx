import React from 'react'

function page() {
  return (
    <div className='flex justify-center items-start w-full min-h-screen'>
      <div className="flex flex-col justify-start w-[90%] h-full mt-5 md:mt-10">
        <h1 className="text-3xl font-bold text-black mb-5"><span className="text-orange-600">{t('blog', 'Статьи')}</span> {t('blog', 'and news')}</h1>
      </div>
    </div>
  )
}

export default page
