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
  toCreateTask: TaskInfo
}
export interface TaskInfo {
  task_title: string
  task_body: string
  task_created_by: string
  task_created_time: string
  task_deadline: string
  task_status: string
  task_fire: boolean
  task_to_work: string
  id?: string
}

export interface applState {
  theme: string
  // authPopupOpen: boolean
}

const baseUrl = 'https://nickdemid.store/'

export const userApi = (
  param: string,
  method: string = 'GET',
  body?: BodyInit | null | undefined,
) => {
  console.log('body: ', body)
  if (method == 'GET') {
    return fetch(`${baseUrl + param}`, {
      method: 'GET',
    })
      .then((data) => data.json())
      .catch((err) => console.error(err))
  }
}
export const taskApi = (param: string, method: string = 'GET', body?: TaskInfo) => {
  console.log('body: ', body)

  if (method == 'GET') {
    return fetch(`${baseUrl + param}`, {
      method: 'GET',
    })
      .then((data) => data.json())
      .catch((err) => console.error(err))
  }

  if (method == 'POST' && body) {
    return fetch(`${baseUrl + param}`, {
      method: 'POST',
      body: JSON.stringify(body),
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

export const formatDateISO = (date: Date) => {
  // Convert the date to ISO string
  const isoString = date.toISOString()
  // Split at the "T" character to get the date part
  const formattedDate = isoString.split('T')[0]
  return formattedDate
}

// // Example usage
// const currentDate = new Date();
// console.log(formatDateISO(currentDate));

export const formatDate = (date: string) => {
  if (!date) return null
  const [year, month, day] = date.split('-')
  return `${day}-${month}-${year}`
}
