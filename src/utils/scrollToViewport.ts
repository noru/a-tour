export function scrollToViewport(target: HTMLElement) {
  let rect = target.getBoundingClientRect()
  let top = rect.top
  let bottom = rect.bottom
  let windowHeight = window.innerHeight
  let padding = 20
  if (top < 0) {
    window.scrollBy(0, top - padding)
  } else if (bottom > windowHeight) {
    window.scrollBy(0, bottom - windowHeight + padding)
  }
}