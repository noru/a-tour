import { getOffset } from "./getOffset"

export type HTMLElementGetter = HTMLElement | string | (() => HTMLElement)
export interface Step {
  title: string
  target: HTMLElementGetter
  hint: string
  hintType?: 'html' | 'text' | 'markdown'
  clickTargetAsNext?: boolean
  delay?: number
}

export function getTarget(getter: HTMLElementGetter): (HTMLElement | null) {
  if (typeof getter === 'object' && getter.nodeType !== undefined) {
    return getter
  }
  if (typeof getter === 'string') {
    return document.querySelector(getter)
  }
  if (typeof getter === 'function') {
    return getter()
  }
  return null
}

type BoundingRect = {
  x: number
  y: number
  w: number
  h: number
}
export function getPosition(target: HTMLElementGetter): BoundingRect {
  let offset = getOffset(getTarget(target)!, document.body)
  return {
    x: offset.left,
    y: offset.top,
    w: offset.width,
    h: offset.height,
  }
}

export function checkBottomSpace(targetPos: BoundingRect, height: number): boolean {
  let { y, h } = targetPos
  let bottom = y + h
  let windowHeight = window.innerHeight
  let space = windowHeight - bottom
  return space > height
}

export function getOverflowX(left: number, right: number): { left: number, right: number } {
  return { left: -left, right: right - window.innerWidth}
}