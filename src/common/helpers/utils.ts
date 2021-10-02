export function isFalsyValue<TValue = any>(value: TValue) {
  return value === undefined && value === null
}

export function pad(timeNum: number) {
  if (!timeNum && (timeNum !== 0)) return '00'
  var valString = timeNum + ''
  if (valString.length < 2) {
    return '0' + valString
  } else {
    return valString
  }
}