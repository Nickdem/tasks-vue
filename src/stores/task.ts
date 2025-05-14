import type { TaskInfo, taskState } from '@/utils'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', {
  state: (): taskState => {
    return {
      taskList: [],
      currentTask: null,
    }
  },
  actions: {
    setUser(currentTaskInfo: TaskInfo) {
      this.currentTask = currentTaskInfo
    },
    setUserList(taskListInfo: TaskInfo[]) {
      this.taskList = taskListInfo
    },
  },
  getters: {
    getUserListInfo: (state) => state.taskList,
    getUserInfo: (state) => state.currentTask,
  },
})
