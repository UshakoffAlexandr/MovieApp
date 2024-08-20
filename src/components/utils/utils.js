import { parse, format, isValid } from 'date-fns'

export const formatReleaseDate = (dateString) => {
  const date = parse(dateString, 'yyyy-MM-dd', new Date())
  if (!isValid(date)) {
    return 'Invalid Date'
  }
  return format(date, 'MMMM d, yyyy')
}

export const truncateDescription = (desc, maxLength = 150) => {
  if (!desc || desc.length === 0) {
    // Проверяем, что desc не undefined и не пустой
    return ''
  }
  if (desc.length <= maxLength) {
    return desc
  }
  const words = desc.split(' ')
  let truncatedDesc = ''
  for (let word of words) {
    if ((truncatedDesc + word).length + 1 > maxLength) {
      break
    }
    truncatedDesc += (truncatedDesc ? ' ' : '') + word
  }
  return truncatedDesc + ' ...'
}
