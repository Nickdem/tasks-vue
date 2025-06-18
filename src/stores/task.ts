import router from '@/router'
import { formatDateISO, taskApi, type TaskInfo, type taskState } from '@/utils'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', {
  state: (): taskState => {
    return {
      taskList: [],
      currentTask: null,
      toCreateTask: {
        task_title: '',
        task_body: '',
        task_created_by: '',
        task_created_time: '',
        task_deadline: new Date().toISOString().split('T')[0],
        task_status: '',
        task_fire: false,
        task_to_work: '',
      },
      taskListLoading: false,
      currentTaskLoading: false,
      currentTaskError: '',
      taskListError: '',
      countOfTasks: 0,
    }
  },
  actions: {
    setCount(number: number) {
      this.countOfTasks = number
    },

    setNameCreatedBy(userName: string) {
      this.toCreateTask.task_created_by = userName
    },
    setStatusCreatedBy(status: string) {
      this.toCreateTask.task_status = status
    },
    setDeadlineDateCreatedBy(number: string) {
      this.toCreateTask.task_deadline = new Date(
        new Date(number).getTime() - new Date().getTimezoneOffset() * 60000,
      )
        .toISOString()
        .split('T')[0]
    },
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
    async deleteFromApiTask(id: number) {
      try {
        const task = await taskApi(`tasks/${id}`, 'DELETE')

        if (await task) {
          router.push('/tasks')
        }
      } catch (err) {
        const error = err instanceof Error
        console.log(error)
      } finally {
        console.log('final')
      }
    },
    async getFromApiTaskList(query?: string) {
      this.setTaskListLoading(true)

      try {
        const tasks = await taskApi('tasks' + query)

        if (await tasks.tasks.length) {
          this.setCount(tasks.count)
          this.setTaskList(tasks.tasks)
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
    async createApiTaskList() {
      // this.setTaskListLoading(true)

      try {
        // const body = new FormData()
        this.toCreateTask.task_created_time = formatDateISO(new Date())

        // body.append('task_title', this.toCreateTask.task_title)
        // body.append('task_body', this.toCreateTask.task_body)
        // body.append('task_created_by', this.toCreateTask.task_created_by)
        // body.append('task_created_time', this.toCreateTask.task_created_time)
        // body.append('task_deadline', this.toCreateTask.task_deadline)
        // body.append('task_status', this.toCreateTask.task_status)
        // body.append('task_fire', this.toCreateTask.task_fire.toString())
        // body.append('task_work_to', this.toCreateTask.task_work_to)
        // console.log(body);
        // console.log(JSON.stringify(body));

        const tasks = await taskApi('tasks', 'POST', this.toCreateTask)

        console.log(await tasks)

        // if (await tasks.tasks.length) {
        //   this.setCount(tasks.count)
        //   this.setTaskList(tasks.tasks)
        // } else {
        //   this.setTaskList([])
        // }
      } catch (err) {
        const error = err instanceof Error
        this.setTaskListError('Что-то пошло не так')
        console.error('Произошла ошибка: ', error)
      } finally {
        // this.setTaskListLoading(false)
      }
    },
    // fetch('https://nickdemid.store/tasks/8',{
    //   method: "PATCH",
    //   body: JSON.stringify({'task_title': 'экстра дип'})})
  },
  getters: {
    getTaskListInfo: (state) => state.taskList,
    getTaskInfo: (state) => state.currentTask,
    getLoadingTask: (state) => state.currentTaskLoading,
    getLoadingTasks: (state) => state.taskListLoading,
    getCount: (state) => state.countOfTasks,
    getToCreateTask: (state) => state.toCreateTask,
    getTaskFire: (state) => (state.currentTask?.task_fire ? +state.currentTask?.task_fire : 0),
  },
})
