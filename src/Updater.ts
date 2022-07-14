import { checkBottomSpace, getOverflowX, getPosition, getTarget, Step } from './utils/chore'
import './styles.scss'
import { scrollToViewport } from './utils/scrollToViewport'

export type ClickAction = 'next' | 'prev' | 'close'


const Template = `
<div class="a-tour-wrapper">
  <div class="a-tour-overlay"></div>
  <div class="a-tour-highlight"></div>
  <div class="a-tour-hint">
    <h1 class="a-tour-hint-title"></h1>
    <p class="a-tour-hint-text"></p>
    <div class="a-tour-actions">
      <label><input class="a-tour-dont-show-again" type="checkbox">Don't show again</label>
      <button class="a-tour-btn skip-btn">Skip</button>
      <button class="a-tour-btn prev-btn">Prev</button>
      <button class="a-tour-btn next-btn">Next</button>
    </div>
  </div>
</div>
`
export class Updater {

  mounted = false
  index: number = -1
  container
  private listener = {} as {[id: string]: (action: ClickAction, dontShowAgain: boolean) => void}

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

  constructor(container: HTMLElement = document.body) {
    this.container = container
    this.prepareDOM()
  }

  mount(id: string, step: Step, index: number, total: number) {
    if (!this.mounted) {
      document.body.appendChild(this.wrapper)
      this.mounted = true
    }
    let target = getTarget(step.target)
    if (!target) {
      throw new Error('Target not found: ' + step.target)
    }
    scrollToViewport(target)
    this.wrapper.id = id
    this.index = index
    this.overlay.style.display = step.clickTargetAsNext ? 'none' : 'block'
    this.hintTitle.innerText = `(${index + 1}/${total}) ${step.title}`
    this.hintText.innerText = step.hint
    this.prevButton.style.display = index === 0 ? 'none' : 'inline-block'
    this.skipButton.style.display = index === total - 1  ? 'none' : 'inline-block'
    if (step.clickTargetAsNext) {
      this.nextButton.disabled = true
      this.nextButton.innerText = 'Click Target'
      let onNext = this.onClick.bind(this)
      target?.addEventListener('click', function probe() {
        onNext('next')
        target?.removeEventListener('click', probe)
      })
    } else {
      this.nextButton.disabled = false
      this.nextButton.innerText = index === total - 1 ? 'Done' : 'Next'
    }

    let targetPos = getPosition(target)
    let { x, y, w, h } = targetPos
    let padding = 4
    this.wrapper.style.top = `${y - padding}px`
    this.wrapper.style.left = `${x - padding}px`
    this.highlight.style.minWidth = `${w + padding * 2}px`
    this.highlight.style.maxWidth = `${w + padding * 2}px`
    this.highlight.style.minHeight = `${h + padding * 2}px`
    this.highlight.style.maxHeight = `${h + padding * 2}px`
    let {x: tx, y: ty} = this.getHintPosition(targetPos)
    this.hint.style.transform = `translate(${tx}px, ${ty}px)`
  }

  unmount() {
    document.body.removeChild(this.wrapper)
    this.mounted = false
  }

  registerListener(id: string, listener: () => void) {
    this.listener[id] = listener
  }

  private onClick(action: ClickAction) {
    let listener = this.listener[this.wrapper.id]
    if (listener) {
      listener(action, this.dontShowAgain.checked)
    }
  }

  private prepareDOM() {
    let dummy = document.createElement('div')
    dummy.innerHTML = Template
    this.wrapper = dummy.firstElementChild as HTMLDivElement
    this.overlay = this.wrapper.querySelector('.a-tour-overlay') as HTMLDivElement
    this.highlight = this.wrapper.querySelector('.a-tour-highlight') as HTMLDivElement
    this.hint = this.wrapper.querySelector('.a-tour-hint') as HTMLDivElement
    this.hintTitle = this.hint.querySelector('.a-tour-hint-title') as HTMLDivElement
    this.hintText = this.hint.querySelector('.a-tour-hint-text') as HTMLDivElement
    this.prevButton = this.wrapper.querySelector('.a-tour-btn.prev-btn') as HTMLButtonElement
    this.nextButton = this.wrapper.querySelector('.a-tour-btn.next-btn') as HTMLButtonElement
    this.skipButton = this.wrapper.querySelector('.a-tour-btn.skip-btn') as HTMLButtonElement
    this.dontShowAgain = this.wrapper.querySelector('.a-tour-dont-show-again') as HTMLInputElement
    this.prevButton.addEventListener('click', () => this.onClick('prev'))
    this.nextButton.addEventListener('click', () => this.onClick('next'))
    this.skipButton.addEventListener('click', () => this.onClick('close'))
  }

  private getHintPosition(targetPos: { x: number, y: number, w: number, h: number }) {
    let { width: w, height: h } = this.hint.getBoundingClientRect()
    let bottom = true // prefer place hint at bottom of the target
    if (!checkBottomSpace(targetPos, h)) {
      bottom = false
    }
    let offsetX = (targetPos.w - w) / 2
    let overflow = getOverflowX(offsetX + targetPos.x, targetPos.x + offsetX + w)
    if (overflow.left > 0 || overflow.right > 0) {
      // adjust offset by overflow
      if (overflow.left + overflow.right < 0) {
        // have enough space on opposite side
        offsetX -= Math.max(overflow.left, overflow.right) * (overflow.left > 0 ? -1 : 1)
      } else {
        // no enough space, try to place hint at the center of the target
        offsetX -= (overflow.left + overflow.right) / 2
      }
    }
    return {
      x: offsetX,
      y: bottom ? 20 : -h - 20 - targetPos.h,
    }
  }

}


export default new Updater()