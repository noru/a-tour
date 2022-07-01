import { checkBottomSpace, getOverflowX, getPosition, getTarget, HTMLElementGetter, Step } from './utils/chore'
import './styles.scss'
import { getOffset } from './utils/getOffset'

export class Stage {

  mounted = false
  container = document.body

  wrapper!: HTMLDivElement
  overlay!: HTMLDivElement
  highlight!: HTMLDivElement
  hint!: HTMLDivElement
  hintTitle!: HTMLDivElement
  hintText!: HTMLDivElement
  prevButton!: HTMLButtonElement
  nextButton!: HTMLButtonElement
  skipButton!: HTMLButtonElement
  dontShowAgain!: HTMLInputElement

  onNext: () => void
  onPrev: () => void
  onSkip: () => void

  constructor(onNext: () => void, onPrev: () => void, onSkip: (dontShowAgain: boolean) => void) {
    this.onNext = onNext
    this.onPrev = onPrev
    this.onSkip = () => {
      onSkip(this.dontShowAgain.checked)
    }
    this.prepare()
  }

  prepare() {
    this._prepareWrapper()
    this._prepareHighlight()
    this._prepareHint()
  }
  
  mount(step: Step, index: number, total: number) {
    if (!this.mounted) {
      document.body.appendChild(this.wrapper)
      this.mounted = true
    }
    this.overlay.style.display = step.clickTargetAsNext ? 'none' : 'block'
    this.hintTitle.innerText = step.title
    this.hintText.innerText = step.hint
    this.prevButton.style.display = index === 0 ? 'none' : 'inline-block'
    this.nextButton.style.display = index === total - 1 ? 'none' : 'inline-block'
    this.skipButton.innerText = index === total - 1  ? 'Done' : 'Skip'
    if (step.clickTargetAsNext) {
      this.nextButton.style.display = 'none'
      let target = getTarget(step.target)
      let onNext = this.onNext
      target?.addEventListener('click', function probe() {
        onNext()
        console.info('on click');
        target?.removeEventListener('click', probe)
      })
    }
    let targetPos = getPosition(step.target)
    let { x, y, w, h } = targetPos
    let padding = 4
    this.wrapper.style.top = `${y - padding}px`
    this.wrapper.style.left = `${x - padding}px`
    this.highlight.style.minWidth = `${w + padding * 2}px`
    this.highlight.style.maxWidth = `${w + padding * 2}px`
    this.highlight.style.minHeight = `${h + padding * 2}px`
    this.highlight.style.maxHeight = `${h + padding * 2}px`
    let {x: tx, y: ty} = this._getHintPosition(targetPos)
    this.hint.style.transform = `translate(${tx}px, ${ty}px)`
  }

  unmount() {
    document.body.removeChild(this.wrapper)
    this.mounted = false
  }
  
  _prepareWrapper() {
    this.wrapper = document.createElement('div')
    this.wrapper.classList.add('a-tour-wrapper')
    this.overlay = document.createElement('div')
    this.overlay.classList.add('a-tour-overlay')
    this.wrapper.appendChild(this.overlay)
  }
  
  _prepareHighlight() {
    this.highlight = document.createElement('div')
    this.highlight.classList.add('a-tour-highlight')
    this.wrapper.appendChild(this.highlight)
  }

  _prepareHint() {
    this.hint = document.createElement('div')
    this.hint.classList.add('a-tour-hint')

    this.hintTitle = document.createElement('h1')
    this.hintTitle.classList.add('a-tour-hint-title')
    this.hintText = document.createElement('p')
    this.hintText.classList.add('a-tour-hint-text')
    this.prevButton = document.createElement('button')
    this.prevButton.innerText = 'Prev'
    this.prevButton.addEventListener('click', this.onPrev)
    this.nextButton = document.createElement('button')
    this.nextButton.innerText = 'Next'
    this.nextButton.addEventListener('click', this.onNext)
    this.skipButton = document.createElement('button')
    this.skipButton.innerText = 'Skip'
    this.skipButton.addEventListener('click', this.onSkip)
    
    this.dontShowAgain = document.createElement('input')
    this.dontShowAgain.type = 'checkbox'
    let label = document.createElement('label')
    label.appendChild(this.dontShowAgain)
    label.appendChild(document.createTextNode('Don\'t show again'))

    this.hint.append(this.hintTitle, this.hintText, this.prevButton, this.nextButton, this.skipButton, label)
    this.wrapper.appendChild(this.hint)
  }

  _getHintPosition(targetPos: { x: number, y: number, w: number, h: number }) {
    let { width: w, height: h } = this.hint.getBoundingClientRect()
    let bottom = true // prefer place hint at bottom of the target
    if (!checkBottomSpace(targetPos, h)) {
      bottom = false
    }
    let offsetX = (targetPos.w - w) / 2
    
    let overflow = getOverflowX(offsetX + targetPos.x, targetPos.x + offsetX + w)
    if (overflow.left > 0 || overflow.right > 0) {
      // adjust offset by overflow
      if (overflow.left + overflow.right < 0) { // have enough space on opposite side
        offsetX -= Math.max(overflow.left, overflow.right)
      } else { // no enough space, try to place hint at the center of the target
        offsetX -= (overflow.left + overflow.right) / 2
      }

    }
    return {
      x: offsetX,
      y: bottom ? 20 : -h - 20 - targetPos.h,
    }
  }

}



