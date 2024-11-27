import type { Pokemon } from '@/interfaces/pokemon'
import { defineStore } from 'pinia'
import { useAuthStore } from './UserStore'

export const usePokemonsStore = defineStore('pokemonsStore', {
  state: () => ({
    pokemons: [] as Pokemon[],
    favorites: [], // Liste des favoris
  }),
  getters: {
    getElementById: (state) => (id: number) => {
      return state.pokemons.find((pokemon) => pokemon.id === id)
    },
    getFavorites(state) {
      return state.favorites;
    },
    // Récupère directement l'utilisateur connecté depuis auth
    userLogged(){
      const authStore = useAuthStore();
      return authStore.userLogged;
    },
  },
  actions: {
    addPokemon(pokemon: Pokemon) {
      if (this.pokemons.find((p) => p.id === pokemon.id) === undefined) {
        this.pokemons.push(pokemon)
      }
    },
    // Charger les favoris d'un utilisateur depuis localStorage
    loadFavorites() {
      if (this.userLogged) {
        const favorites = JSON.parse(localStorage.getItem(`favorites-${this.userLogged.username}`)) || [];
        this.favorites = favorites;
      }
    },
    // Sauvegarder les favoris de l'utilisateur dans localStorage
    saveToLocalStorage() {
      if (this.userLogged) {
        localStorage.setItem(`favorites-${this.userLogged.username}`, JSON.stringify(this.favorites));
      }
    },
    // Ajouter un Pokémon aux favoris
    addFavorite(pokemon) {
      if (this.userLogged && !this.favorites.find(fav => fav.id === pokemon.id)) {
        this.favorites.push(pokemon);
        this.saveToLocalStorage();
      }
    },
    // Supprime un Pokémon des favoris
    removeFavorite(pokemonId) {
      if (this.userLogged) {
        this.favorites = this.favorites.filter(fav => fav.id !== pokemonId);
        this.saveToLocalStorage();
      }
    },
  },
})
