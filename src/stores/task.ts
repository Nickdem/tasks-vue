import { defineStore } from 'pinia'

interface State {
  taskList: TaskInfo[]
  currentTask: TaskInfo | null
}

export const useUserStore = defineStore('task', {
  state: (): State => {
    return {
      taskList: [],
      currentTask: null,
    }
  },
})

interface TaskInfo {
  task_title: string
  task_body: string
  task_created_by: string
  task_created_time: string
  task_deadline: string
  task_status: string
  task_fire: string
  task_work_to: string
}
