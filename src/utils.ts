export interface UserInfo {
  user_fullname: string
  user_job: string
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
}

const baseUrl = 'https://nickdemid.store/'

export const userApi = (param: string, method: string = 'GET', body?: UserInfo) => {
  console.log('body: ', body)

  if (method == 'GET') {
    return fetch(`${baseUrl + param}`, {
      method: 'GET',
    })
      .then((data) => data.json())
      .catch((err) => console.log(err))
  }
}

// export const taskApi = (param: string, method: string, body?: UserInfo) => {

// }
