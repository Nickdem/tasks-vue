export interface UserInfo {
  user_fullname: string
  user_job: string
  id: number
}
export interface UserState {
  userList: UserInfo[]
  user: UserInfo | null
  loadingUsers: boolean
  loadingUser: boolean
  errorUsers: string
  errorUser: string
}
export interface taskState {
  taskList: TaskInfo[]
  currentTask: TaskInfo | null
  taskListLoading: boolean
  currentTaskLoading: boolean
  currentTaskError: string
  taskListError: string
  countOfTasks: number
}
export interface TaskInfo {
  task_title: string
  task_body: string
  task_created_by: string
  task_created_time: string
  task_deadline: string
  task_status: string
  task_fire: string
  task_work_to: string
  id: string
}

const baseUrl = 'https://nickdemid.store/'

export const userApi = (param: string, method: string = 'GET', body?: UserInfo) => {
  console.log('body: ', body)
  if (method == 'GET') {
    return fetch(`${baseUrl + param}`, {
      method: 'GET',
    })
      .then((data) => data.json())
      .catch((err) => console.error(err))
  }
}
export const taskApi = (param: string, method: string = 'GET', body?: UserInfo) => {
  console.log('body: ', body)

  if (method == 'GET') {
    return fetch(`${baseUrl + param}`, {
      method: 'GET',
    })
      .then((data) => data.json())
      .catch((err) => console.error(err))
  }
}

export function makeSessionUser(user: UserInfo) {
  if (user.id) {
    const dateNow = Date.now()
    const endDate = dateNow + 3600000 * 8
    sessionStorage.setItem('task-user-start-life', dateNow.toString())
    sessionStorage.setItem('task-user-end-life', endDate.toString())
    sessionStorage.setItem('task-user', JSON.stringify(user))
  }
}

export function resetSessionUser() {
  sessionStorage.removeItem('task-user-start-life')
  sessionStorage.removeItem('task-user-end-life')
  sessionStorage.removeItem('task-user')
  resetSessionPaginationLength()
}

export function getSessionUser() {
  return {
    endTime: sessionStorage.getItem('task-user-end-life'),
    taskUser: sessionStorage.getItem('task-user'),
  }
}

export function makeSessionPaginationLength(num: number) {
  sessionStorage.setItem('task-user-pagination', num.toString())
}

export function resetSessionPaginationLength() {
  sessionStorage.removeItem('task-user-pagination')
}

export function getSessionPaginationLength() {
  return sessionStorage.getItem('task-user-pagination')
}

// export const taskApi = (param: string, method: string, body?: UserInfo) => {

// }
