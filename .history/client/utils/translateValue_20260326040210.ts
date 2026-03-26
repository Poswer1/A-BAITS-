type SelectItem<T extends string | number> = {
  name: T
  ru?: string
  uk?: string
}

export const getValueByLang = <T extends string | number>(
  list: any[],
  value: T,
  lang: string
) => {
  if(!value || !list) return ''
  const valueObj = list.find(obj => obj.name === value)
  return lang === 'ru' ? valueObj?.ru || valueObj?.lang  : valueObj?.uk || valueObj?.lang
}