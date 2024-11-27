import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PokemonDetails from '@/components/PokemonDetails.vue'
import FavoritesList from '@/components/FavoritesList.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: "/pokemon/:id",
      name: "details",
      component: PokemonDetails,
      props: (route) => ({ id: Number(route.params.id) }),
    },
    {
      path: "/favorites",
      name: "favorites",
      component: FavoritesList,
    },
  ],
})

export default router
