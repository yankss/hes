export function serialize(obj) {
  let urlStr = ''
  for (const key in obj) {
    urlStr = urlStr + `${key}=${obj[key]}&`
  }
  urlStr = urlStr.slice(0, -1)
  return urlStr;
}

export function debounce(fn, delay) {
  console.log(11111111111);
  let timeout = null;
  return function() {
    if(timeout != null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn()
      timeout = null;
    }, delay);
  }
}