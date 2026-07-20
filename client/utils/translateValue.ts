export type SelectItem<T extends string | number> = {
  name: T
  ru?: string
  uk?: string
  lang?: string
}

export const getValueByLang = <T extends string | number>(
  list: SelectItem<T>[],
  value: T,
  lang: string
) => {
  if(!value || !list) return ''
  const valueObj = list.find(obj => obj.name === value)
  if (!valueObj) return ''
  return lang === 'ru' ? valueObj?.ru || valueObj?.lang  : valueObj?.uk || valueObj?.lang
}