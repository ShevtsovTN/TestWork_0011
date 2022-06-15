export function minLength(num) {
  return val => val.length >= num
}
export function maxLength(num) {
  return val => val.length <= num
}

export function required(val) {
  return !!val
}
