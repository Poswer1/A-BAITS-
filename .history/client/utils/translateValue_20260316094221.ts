export const getValueByLang = (
  list: any[],
  value: string,
  lang: 'ru' | 'uk'
) => {
  const valueObj = list.find(obj => obj.name === value)
  return lang === 'ru' ? valueObj?.ru : valueObj?.uk
}