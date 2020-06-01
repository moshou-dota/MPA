export function addEventListener (dom, eventType, func, options = false) {
  dom.addEventListener(eventType, func, options)
}

export function removeListener (dom, eventType, func) {
  dom.removeEventListener(eventType, func)
}

export function getTargetDom (dom, parentDom) {
  const html = document.documentElement
  const body = document.body
  while (dom !== html && dom !== body && dom.parentNode !== parentDom) {
    dom = dom.parentNode
  }
  return dom
}

export function urlQuery () {
  let result = {}
  const search = decodeURI(window.location.search).slice(1)
  if (search) {
    search.split('&').forEach(item => {
      let data = item.split('=')
      result[data[0]] = data[1]
    })
  }
  return result
}
