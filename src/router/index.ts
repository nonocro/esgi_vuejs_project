import { createRouter, createWebHistory } from 'vue-router'
import FavoritesList from '@/components/FavoritesList.vue'
import PokemonDetailsView from '@/views/PokemonDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: "/favorites",
      name: "favorites",
      component: FavoritesList,
    },
    {
      path: '/pokemons',
      name: 'pokemons',
      component: () => import('../views/PokemonListView.vue'),
    },
    {
      path: "/admin",
      name: 'admin',
      component: () => import('../views/AdminView.vue')
    },
    {
      path: '/profil',
      name: 'profil',
      component: () => import('../views/ProfilView.vue')
    },
    {
      path: '/pokemon_details/:id',
      name: 'pokemon_details',
      component: PokemonDetailsView,
    }
  ],
})

export default router
