import { Step } from "./utils/chore"
import { Stage } from "./Stage"
import { setCookie } from "./utils/cookie"

export class Runner {

  steps: Step[]
  current = -1

  get step() {
    return this.steps[this.current]
  }

  _stage = new Stage(this.next.bind(this), this.prev.bind(this), this.skip.bind(this))
  constructor(steps: Step[]) {
    this.steps = steps
  }

  next() {
    let step = this.step
    this.current++
    if (!this.step) {
      this._stage.unmount()
      return
    }
    if (step?.clickTargetAsNext) {
      this._stage.unmount()
      setTimeout(() => this.show(), step.delay || 1000)
    } else {
      this.show()
    }
  }
  
  prev() {
    this.current--
    this.show()
  }
  
  show() {
    this._stage.mount(this.step, this.current, this.steps.length)
  }

  skip(dontShowAgain: boolean) {
    if (dontShowAgain) {
      setCookie('atour-dont-show-again', 'true', 365)
    }
    this._stage.unmount()
  }
}
