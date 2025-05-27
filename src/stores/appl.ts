import type { applState } from '@/utils'
import { defineStore } from 'pinia'

export const useApplStore = defineStore('appl', {
  state: (): applState => {
    return {
      theme: 'dark',
      // authPopupOpen: false,
    }
  },
  actions: {
    toggleTheme() {
      this.theme = this.theme == 'light' ? 'dark' : 'light'
    },
    // setAuthPopupOpen(value: boolean) {
    //   this.authPopupOpen = value
    // },
  },
  getters: {
    getTheme: (state) => state.theme,
    // getAuthPopupOpen: (state) => state.authPopupOpen,
  },
})
