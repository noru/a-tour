
import { observable } from 'mobx'
import { useEffect } from 'react'
import { useObservable } from 'use-mobx-observable'

interface Store {
  ctx: any
  api: any
  myNotebooks: any[]
  notebook: any
  getMyNotebooks: () => Promise<any>
  getNotebook: (id: string) => Promise<any>
}

export const Store = observable<Store>({
  ctx: null,
  api: null,
  notebook: null,
  myNotebooks: [],
  async getMyNotebooks() {
    if (!this.api) {
      return
    }
    return this.myNotebooks = await this.api.getMyNotebooks()
  },
  async getNotebook(id: string) {
    if (!this.api) {
      return
    }
    return this.notebook = await this.api.getNotebook(id)
  },
}, {
  myNotebooks: observable.ref,
  notebook: observable.ref,
}, { autoBind: true })
