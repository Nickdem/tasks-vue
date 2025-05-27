import type { applState, BreadcrumbInfo } from '@/utils'
import { defineStore } from 'pinia'

export const useApplStore = defineStore('appl', {
  state: (): applState => {
    return {
      theme: 'dark',
      breadcrumbsList: [],
      // authPopupOpen: false,
    }
  },
  actions: {
    toggleTheme() {
      this.theme = this.theme == 'light' ? 'dark' : 'light'
    },
    setBreadcrumbsList(arr: BreadcrumbInfo[]) {
      this.breadcrumbsList = arr
    },
    // setAuthPopupOpen(value: boolean) {
    //   this.authPopupOpen = value
    // },
  },
  getters: {
    getTheme: (state) => state.theme,
    getBreadcrumbsList: (state) => state.breadcrumbsList,
    // getAuthPopupOpen: (state) => state.authPopupOpen,
  },
})
