import { HTMLElementGetter, Step } from "./utils/chore"
import { Runner } from "./Runner"
import { getCookie } from "./utils/cookie"

interface Options {
  container: HTMLElementGetter
  steps: Step[]
}

export default class ATour {

  _options: Options = {
    container: () => document.body,
    steps: []
  }

  private _runner: Runner

  constructor(options: Partial<Options> = {}) {
    Object.assign(this._options, options)
    this._runner = new Runner(this._options.steps)
  }

  start() {
    if (getCookie('atour-dont-show-again') === 'true') {
      return
    }
    this._runner.next()
  }

}


