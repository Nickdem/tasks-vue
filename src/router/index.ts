import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import TasksView from '@/views/TasksView.vue'
import TaskView from '@/views/TaskView.vue'
import ProfileView from '@/views/ProfileView.vue'
import { useUserStore } from '@/stores/user'
// import CreateView from '@/views/CreateView.vue'
const breadcrumbBase = [
  {
    title: 'Главная',
    to: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/create',
      name: 'create',
      // component: CreateView,
      component: () => import('../views/CreateView.vue'),
      meta: {
        breadcrumbs: [
          ...breadcrumbBase,
          {
            title: 'Создать задачу',
          },
        ],
      },
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksView,
      meta: {
        breadcrumbs: [
          ...breadcrumbBase,
          {
            title: 'Задачи',
          },
        ],
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {
        breadcrumbs: [
          ...breadcrumbBase,
          {
            title: 'Профиль',
          },
        ],
      },
    },
    {
      path: '/tasks/:id',
      name: 'task',
      component: TaskView,
      meta: {
        breadcrumbs: [
          ...breadcrumbBase,
          {
            title: 'Задача',
          },
        ],
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.name !== 'home' && !userStore.user) next({ name: 'home' })
  else next()
})
export default router
