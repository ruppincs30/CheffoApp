export function nameValidator(name) {
  const re = /^[a-zA-Z]+$/
  if (!name || name.length <= 0) return "Name can't be empty."
  if (!re.test(name)) return 'Ooops! We need a valid name.'
  return ''
}



