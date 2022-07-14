import { getTarget, Step } from "./utils/chore"
import { setCookie } from "./utils/cookie"
import { Options } from "."
import {ClickAction, Updater} from "./Updater"

// cache DOM per container
const updaterCache = new WeakMap

export class Runner {
  
  private domUpdater
  private id = 'default'
  steps: Step[]
  current = -1

  get step() {
    return this.steps[this.current]
  }

  constructor(options: Options) {
    this.id = options.id
    this.steps = options.steps
    let container = getTarget(options.container) || document.body
    if (!updaterCache.get(container)) {
      updaterCache.set(container, new Updater(container))
    }
    this.domUpdater = updaterCache.get(container)
    this.domUpdater.registerListener(this.id, this.go.bind(this))
  }

  go(action: ClickAction, dontShowAgain = false) {
    if (dontShowAgain) {
      setCookie('atour_inactive_' + this.id, 'true', 365)
    }
    let currentStep = this.step
    if (action === 'next') {
      this.current++
    } else if (action === 'prev') {
      this.current--
    } else {
      this.current = -1
    }
    if (currentStep?.delay) {
      this.domUpdater.unmount()
      setTimeout(() => this.show(), currentStep.delay || 1000)
    } else {
      this.show()
    }
  }

  show() {
    if (!this.step) {
      this.domUpdater.unmount()
      return
    }
    this.domUpdater.mount(this.id, this.step, this.current, this.steps.length)
  }

}
