import type { Pokemon } from '@/interfaces/pokemon'
import { defineStore } from 'pinia'

export const usePokemonsStore = defineStore('pokemonsStore', {
  state: () => ({
    pokemons: [] as Pokemon[],
  }),
  getters: {
    getElementById: (state) => (id: number) => {
      return state.pokemons.find((pokemon) => pokemon.id === id)
    },
  },
  actions: {
    addPokemon(pokemon: Pokemon) {
      if (this.pokemons.find((p) => p.id === pokemon.id) === undefined) {
        this.pokemons.push(pokemon)
      }
    },
  },
})
