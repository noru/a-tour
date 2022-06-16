import { Store } from './store'
import { EntryDialog } from './dialog'

export default function setup(ctx: any) {
  Store.ctx = ctx
  Store.api = ctx.zetaService

  return {
    onDestroy() {
      // todo
    },
    EntryDialog,
  }
}