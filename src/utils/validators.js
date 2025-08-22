export function validateCheckout(form){
  const errs = {}
  if(!form.name.trim()) errs.name = 'Name is required.'
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Valid email is required.'
  if(!/^[+\d][\d\s-]{6,}$/.test(form.phone)) errs.phone = 'Valid phone is required.'
  if(form.address.trim().length < 10) errs.address = 'Please enter a more complete address.'
  return errs
}
