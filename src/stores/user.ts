import { userApi, makeSessionUser, type UserInfo, type UserState, resetSessionUser } from '@/utils'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      userList: [],
      user: null,
      loadingUsers: false,
      loadingUser: false,
      errorUsers: '',
      errorUser: '',
    }
  },
  actions: {
    setUser(userInfo: UserInfo | null) {
      this.user = userInfo
      if (userInfo) {
        makeSessionUser(userInfo)
      } else {
        resetSessionUser()
      }
    },
    setUserList(userListInfo: UserInfo[]) {
      this.userList = userListInfo
    },
    setLoadingUser(value: boolean) {
      this.loadingUser = value
    },
    setLoadingUsers(value: boolean) {
      this.loadingUsers = value
    },
    setErrorUsers(value: string) {
      this.errorUsers = value
    },
    setErrorUser(value: string) {
      this.errorUser = value
    },
    async getFromApiUserList() {
      this.setLoadingUsers(true)

      try {
        const users = await userApi('task-users')
        if (await users.length) {
          this.setUserList(users)
        } else {
          this.setUserList([])
        }
      } catch (err) {
        const error = err instanceof Error
        this.setErrorUsers('Что-то пошло не так')
        console.error('Произошла ошибка: ', error)
      } finally {
        this.setLoadingUsers(false)
      }
    },
    async getFromApiUser(id: number) {
      this.setLoadingUser(true)
      try {
        const user = await userApi(`task-users/${id}`)
        if (await user) {
          this.setUser(user)
        }
      } catch (err) {
        const error = err instanceof Error
        this.setErrorUser('Что-то пошло не так')
        console.error('Произошла ошибка: ', error)
      } finally {
        this.setLoadingUser(false)
      }
    },
  },
  getters: {
    getUserListInfo: (state) => state.userList,
    getUserInfo: (state) => state.user,
    getLoadingUser: (state) => state.loadingUser,
    getLoadingUsers: (state) => state.loadingUsers,
    getUserInfoName: (state) => state.user?.user_fullname || null,
    getUserInfoJob: (state) => state.user?.user_job || null,
  },
})
