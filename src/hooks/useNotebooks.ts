import { useEffect } from 'react'
import { useObservable } from 'use-mobx-observable'
import { Store } from '../store'

export function useNotebooks() {
  useEffect(() => {
    Store.getMyNotebooks()
  }, [])
  return useObservable(Store)
}