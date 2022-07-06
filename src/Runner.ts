import { Step } from "./utils/chore"
import { Updater } from "./Updater"
import { setCookie } from "./utils/cookie"

export class Runner {

  steps: Step[]
  current = -1

  get step() {
    return this.steps[this.current]
  }

  _stage = new Updater(this.go.bind(this))
  constructor(steps: Step[]) {
    this.steps = steps
  }

  go(next: number, dontShowAgain = false) {
    if (dontShowAgain) {
      setCookie('atour_dont_show_again', 'true', 365)
    }
    let currentStep = this.step
    this.current = next
    if (currentStep?.clickTargetAsNext) {
      this._stage.unmount()
      setTimeout(() => this.show(), currentStep.delay || 1000)
    } else {
      this.show()
    }
  }

  show() {
    if (!this.step) {
      this._stage.unmount()
      return
    }
    this._stage.mount(this.step, this.current, this.steps.length)
  }

}
