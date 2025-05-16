import { taskApi, type TaskInfo, type taskState } from '@/utils'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', {
  state: (): taskState => {
    return {
      taskList: [],
      currentTask: null,
      taskListLoading: false,
      currentTaskLoading: false,
      currentTaskError: '',
      taskListError: '',
    }
  },
  actions: {
    setCurrentTask(currentTaskInfo: TaskInfo) {
      this.currentTask = currentTaskInfo
    },
    setTaskList(taskListInfo: TaskInfo[]) {
      this.taskList = taskListInfo
    },
    setTaskListLoading(value: boolean) {
      this.taskListLoading = value
    },
    setCurrentTaskLoading(value: boolean) {
      this.currentTaskLoading = value
    },
    setCurrentTaskError(value: string) {
      this.currentTaskError = value
    },
    setTaskListError(value: string) {
      this.taskListError = value
    },
    async getFromApiTask(id: number) {
      this.setCurrentTaskLoading(true)

      try {
        const task = await taskApi(`tasks/${id}`)
        if (await task) {
          this.setCurrentTask(task)
        }
      } catch (err) {
        const error = err instanceof Error
        this.setCurrentTaskError('Что-то пошло не так')
        console.error('Произошла ошибка: ', error)
      } finally {
        this.setCurrentTaskLoading(false)
      }
    },
    async getFromApiTaskList(query?: string) {
      this.setTaskListLoading(true)

      try {
        const tasks = await taskApi('tasks' + query)
        if (await tasks.length) {
          this.setTaskList(tasks)
        } else {
          this.setTaskList([])
        }
      } catch (err) {
        const error = err instanceof Error
        this.setTaskListError('Что-то пошло не так')
        console.error('Произошла ошибка: ', error)
      } finally {
        this.setTaskListLoading(false)
      }
    },
  },
  getters: {
    getTaskListInfo: (state) => state.taskList,
    getTaskInfo: (state) => state.currentTask,
    getLoadingTask: (state) => state.currentTaskLoading,
    getLoadingTasks: (state) => state.taskListLoading,
  },
})
