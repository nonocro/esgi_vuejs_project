import type { Pokemon } from '@/interfaces/pokemon'
import type { PokemonType } from '@/interfaces/pokemonsTypes'
import { defineStore } from 'pinia'
import { useAuthStore } from './useAuthStore'

export const usePokemonsStore = defineStore('pokemonsStore', {
  state: () => ({
    pokemons: [] as Pokemon[],
    favorites: [], // Liste des favoris
  }),
  getters: {
    getPokemonById: (state) => (id: number) => {
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
    getPokemonPosition: (state) => (id:number) => {
      return state.pokemons.findIndex((pokemon) => pokemon.id === id)
    }
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
    async fetchAndUpdatePokemonTypes(pokemonTypes: PokemonType[], pokemonId: number) {
      try {
        await Promise.all(
          pokemonTypes.map(async (pokemonType) => {
            const response = await fetch(`https://pokeapi.co/api/v2/type/${pokemonType.name}`, {
              method: 'GET',
              headers: { Accept: 'application/json' },
            });

            if (!response.ok) {
              throw new Error(`Failed to fetch data for Pokemon types: ${pokemonType.name}`);
            }

            const result = await response.json();

            const pokemonPosition = this.getPokemonPosition(pokemonId);
            if (pokemonPosition === -1) {
              throw new Error(`Pokemon with ID ${pokemonId} not found.`);
            }

            const pokemonTypesList = this.pokemons[pokemonPosition]?.types || [];
            const typeIndex = pokemonTypesList.findIndex((type) => type.name === pokemonType.name);

            if (typeIndex !== -1) {
              pokemonTypesList[typeIndex].img_url = result['sprites']['generation-iv']['platinum']['name_icon'];
            }
          })
        );
      } catch (error) {
        console.error('Error during fetchAndUpdatePokemonTypes:', error instanceof Error ? error.message : error);
        throw new Error(`Failed to fetch data for Pokemon types`);
      }
    }
  },
})
