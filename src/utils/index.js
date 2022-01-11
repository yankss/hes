export function serialize(obj) {
  let urlStr = ''
  for (const key in obj) {
    urlStr = urlStr + `${key}=${obj[key]}&`
  }
  urlStr = urlStr.slice(0, -1)
  return urlStr;
}