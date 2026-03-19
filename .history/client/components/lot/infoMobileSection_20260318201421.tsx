

export default function InfoMobileSection() {
  return (
    <div className={`${columnBlock} md:hidden`}>
                   <h1 className="text-2xl font-bold">{lot.name || 'Not Found'}</h1>
                   <div className="flex flex-wrap justify-start items-start w-full text-sm gap-2">
                      <span className="flex gap-1">
                          № лота 
                          <span className="text-orange-600">{lot.lotNumber || '11111111'}</span>
                          <Copy className="text-orange-600 w-4 cursor-pointer"/>
                      </span>
                      <span>{t('lot', 'lot-state')} <span className="text-orange-600">{transleteState || lot.state}</span></span>
                      <span>{t('lot', 'lot-location')}<span className="text-orange-600"> {transleteCity || lot.location}</span></span>
                      <span className="flex text-black">{TransleteCategory && lang === 'ru' ? TransleteCategory.ru : TransleteCategory?.uk} | {TransleteSubCategory && lang === 'ru' ? TransleteSubCategory.ru : TransleteSubCategory?.uk} | {TransleteSubSubCategory && lang === 'ru' ? TransleteSubSubCategory?.ru : TransleteSubSubCategory?.uk}</span>
                   </div>
     <FavoritesButton id={lot._id}/>
    </div>
  )
}
