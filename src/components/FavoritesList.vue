<template>
  <div v-if="store.userId">
    <h1>Mes favoris</h1>
    <ul v-if="favorites.length">
      <li v-for="pokemon in favorites" :key="pokemon.id">
        <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
        <span>{{ pokemon.name }}</span>
        
        <button @click="removeFromFavorites(pokemon.id)">Supprimer</button>
      </li>
    </ul>
    <p v-else>Aucun Pokémon favori pour le moment.</p>
  </div>
</template>

<script>
import { usePokemonStore } from "@/stores/pokemonStore";

export default {
  setup() {
    const store = usePokemonStore();
    return { store };
  },
  computed: {
    favorites() {
      return this.store.favorites;
    },
  },
  methods: {
    removeFromFavorites(id) {
      this.store.removeFavorite(id);
    },
  },
};
</script>

<style>
ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  gap: 10px;
}

img {
  width: 50px;
  height: 50px;
}
</style>
