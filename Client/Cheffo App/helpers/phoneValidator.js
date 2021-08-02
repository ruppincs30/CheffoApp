export function phoneValidator(phone) {
    const re = /^[0-9\b]+$/
    if (!phone || phone.length <= 0) return "Phone can't be empty."
    if (phone.length !== 10) return "Phone most be 10 digit."
    if (!re.test(phone)) return 'Ooops! We need a valid phone.'
    return ''
  }
  
  