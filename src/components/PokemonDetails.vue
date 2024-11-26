<template>
  <div v-if="pokemon">
    <h1>{{ pokemon.name }}</h1>
    <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
    <button @click="toggleFavorite" :disabled="!store.userId">
      <b-icon 
        :icon="isFavorite ? 'heart-fill' : 'heart'" 
        variant="danger">
      </b-icon>
      {{ isFavorite ? "Retirer des favoris" : "Ajouter aux favoris" }}
    </button>
  </div>
</template>

<script>
import axios from "axios";
import { usePokemonsStore } from "@/stores/usePokemonsStore";
import { computed, ref } from "vue";

export default {
  props: {
    id: Number, // ID du Pokémon passé en prop
  },
  setup(props) {
    const store = usePokemonsStore();
    const pokemon = ref(null);

    const isFavorite = computed(() =>
      store.favorites.some((fav) => fav.id === props.id)
    );

    const fetchPokemon = async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${props.id}`
      );
      pokemon.value = response.data;
    };

    const toggleFavorite = () => {
      if (store.userId) {
        if (isFavorite.value) {
          store.removeFavorite(props.id);
        } else {
          store.addFavorite(pokemon.value);
        }
      }
    };

    fetchPokemon();

    return { pokemon, isFavorite, toggleFavorite, store };
  },
};
</script>
  