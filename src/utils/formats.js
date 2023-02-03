export  function thousandSeparator(str) {
  if(str) {
      const reversedStr = [...str].reverse().join('')
      const seperatedStr = reversedStr.match(/.{1,3}/g).toString()
      str = [...seperatedStr].reverse().join('')
    }
  return str
}