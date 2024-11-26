import { defineStore } from 'pinia';
import axios from 'axios';

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    userId: null, // L'ID de l'utilisateur connecté
    favorites: [], // Liste des favoris
  }),
  actions: {
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
  getters: {
    getFavorites(state) {
      return state.favorites;
    },
  },
});
