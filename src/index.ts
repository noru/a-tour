import { HTMLElementGetter, Step } from "./utils/chore"
import { Runner } from "./Runner"
import { getCookie } from "./utils/cookie"

export interface Options {
  id: string
  container: HTMLElementGetter
  steps: Step[]
}

export default class ATour {

  private options: Options = {
    id: 'default',
    container: () => document.body,
    steps: []
  }

  private _runner: Runner

  constructor(options: Partial<Options> = {}) {
    Object.assign(this.options, options)
    this._runner = new Runner(this.options)
  }

  start() {
    if (getCookie('atour_inactive_' + this.options.id) === 'true') {
      return
    }
    this._runner.go('next')
  }

  stop() {
    this._runner.go('close')
  }

}


