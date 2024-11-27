<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { usePokemonsStore } from '@/stores/usePokemonsStore';
  import { useToast } from 'vue-toastification';
  import type { Pokemon } from '@/interfaces/pokemon';

  const toast = useToast();
  const route = useRoute();
  const pokemonId = route.params.id; // Get Pokemon Id from the route
  const pokemonStore = usePokemonsStore();
  const pokemonObject = ref<Pokemon | null>(null);

  const loading = ref(true);

  // Exemple de données pour test
  const test: Pokemon = {
    id: 1,
    name: 'Bulbasaur',
    img_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    types: [
      { name: 'grass', img_url: '' },
      { name: 'poison', img_url: '' },
    ],
    weight: 69,
    height: 7,
  };
  pokemonStore.addPokemon(test);
  /////

  const fetchAndUpdatePokemon = async () => {
    try {
      // Get Pokemon by Id
      const pokemon = pokemonStore.getPokemonById(Number(pokemonId));
      if (!pokemon) {
        loading.value = false;
        throw new Error(`No Pokemon found with ID ${pokemonId}`);
      }
      pokemonObject.value = pokemon;
      // Fetch Pokemon types to get the icons linked
      await pokemonStore.fetchAndUpdatePokemonTypes(pokemon.types, pokemon.id);
      loading.value = false;
    } catch (error) {
      loading.value = false;
      toast.error(error instanceof Error ? error.message : error);
      console.error("An error occurred when fetching Pokémon's types:", error);
    }
  };

  onMounted(() => {
    fetchAndUpdatePokemon();
  });
</script>

<template>
  <div v-if="loading">
    <p>Loading Pokemon data...</p>
  </div>

  <div v-else>
    <div v-if="!pokemonObject">
      <p>No data found</p>
    </div>

    <div v-else>
      <div class="pokemon-container">
        <div class="pokemon-image">
          <img :src="pokemonObject.img_url"/>
        </div>
        <div class="pokemon-infos">
          <h1>{{ pokemonObject.name }}</h1>
          <div class="type-container">
            <label>Type :</label>
            <div class="pokemon-types">
              <span v-for="pokemonType in pokemonObject.types" :key="pokemonType.name">
                <img :src="pokemonType.img_url"/>
              </span>
            </div>
          </div>
          <label>Poids : {{ (pokemonObject.weight ?? 0) / 10 }} Kilograms</label> <br />
          <label>Taille : {{ (pokemonObject.height ?? 0) * 10 }} Centimeters</label>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
  .pokemon-container {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    max-width: 800px;
    margin: 0 auto;
  }

  .pokemon-image img {
    max-width: 100%; /* Empêche l'image de déborder de son conteneur */
    width: 250px; /* Définit une largeur fixe pour agrandir l'image */
    height: auto; /* Maintient les proportions de l'image */
    border: 1px solid #ddd;
    border-radius: 8px;
  }

  .pokemon-infos {
    max-width: 500px;
  }

  .type-container {
    display: flex;
    align-items: center; /* Alignement vertical entre le label et les images */
    gap: 10px; /* Espacement entre le label et les images */
  }

  .pokemon-types {
    display: flex;
    align-items: center; /* Assure que les images restent alignées au centre vertical */
    gap: 5px;
  }
</style>
