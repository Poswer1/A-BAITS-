export const getValueByLang = (
  list: any[],
  value: string,
  lang: string
) => {
  if()
  const valueObj = list.find(obj => obj.name === value)
  return lang === 'ru' ? valueObj?.ru || valueObj?.lang  : valueObj?.uk || valueObj?.lang
}