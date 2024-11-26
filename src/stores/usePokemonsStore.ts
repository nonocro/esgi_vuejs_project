import type { Pokemon } from '@/interfaces/pokemon'
import { defineStore } from 'pinia'

export const usePokemonsStore = defineStore('pokemonsStore', {
  state: () => ({
    pokemons: [] as Pokemon[], 
    userId: null, // L'ID de l'utilisateur connecté
    favorites: [], // Liste des favoris
  }),
  getters: {
    getElementById: (state) => (id: number) => {
      return state.pokemons.find((pokemon) => pokemon.id === id)
    },
    getFavorites(state) {
      return state.favorites;
    },
  },
  actions: {
    addPokemon(pokemon: Pokemon) {
      this.pokemons.push(pokemon) 
    },
    // Initialiser l'utilisateur
    setUser(userId) {
      this.userId = userId;
      this.loadFavorites();
    },
    // Charger les favoris d'un utilisateur depuis localStorage
    loadFavorites() {
      if (this.userId) {
        const favorites = JSON.parse(localStorage.getItem(`favorites-${this.userId}`)) || [];
        this.favorites = favorites;
      }
    },
    // Sauvegarder les favoris de l'utilisateur dans localStorage
    saveToLocalStorage() {
      if (this.userId) {
        localStorage.setItem(`favorites-${this.userId}`, JSON.stringify(this.favorites));
      }
    },
    // Ajouter un Pokémon aux favoris
    addFavorite(pokemon) {
      if (this.userId && !this.favorites.find(fav => fav.id === pokemon.id)) {
        this.favorites.push(pokemon);
        this.saveToLocalStorage();
      }
    },
    // Supprime un Pokémon des favoris
    removeFavorite(pokemonId) {
      if (this.userId) {
        this.favorites = this.favorites.filter(fav => fav.id !== pokemonId);
        this.saveToLocalStorage();
      }
    },
  },
})
