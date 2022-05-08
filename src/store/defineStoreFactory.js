// reference: https://vitejs.cn/guide/api-hmr.html & https://pinia.vuejs.org/api/modules/pinia.html#accepthmrupdate

import { defineStore, acceptHMRUpdate } from 'pinia'

export default function (...args) {
  const useStore = defineStore(...args)
  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
  }
  return useStore
}
