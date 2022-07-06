export function getOffset(element: HTMLElement, relativeEl: HTMLElement) {
  let body = document.body
  let docEl = document.documentElement
  let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
  let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft

  relativeEl = relativeEl || body

  let x = element.getBoundingClientRect()
  let xr = relativeEl.getBoundingClientRect()
  let relativeElPosition = getPropValue(relativeEl, 'position')

  let obj = {
    width: x.width,
    height: x.height,
  }

  if (
    (relativeEl.tagName.toLowerCase() !== 'body' && relativeElPosition === 'relative')
    || relativeElPosition === 'sticky'
  ) {
    return Object.assign(obj, {
      top: x.top - xr.top,
      left: x.left - xr.left,
    })
  } else {
    if (isFixed(element)) {
      return Object.assign(obj, {
        top: x.top,
        left: x.left,
      })
    } else {
      return Object.assign(obj, {
        top: x.top + scrollTop,
        left: x.left + scrollLeft,
      })
    }
  }
}

function isFixed(element: HTMLElement): boolean {
  const p = element.parentNode

  if (!p || p.nodeName === 'HTML') {
    return false
  }
  if (getPropValue(element, 'position') === 'fixed') {
    return true
  }
  return isFixed(p as HTMLElement)
}

function getPropValue(element: HTMLElement, propName: string) {
  let propValue = ''
  if (document.defaultView && document.defaultView.getComputedStyle) {
    propValue = document.defaultView
      .getComputedStyle(element, null)
      .getPropertyValue(propName)
  }
  return propValue
}