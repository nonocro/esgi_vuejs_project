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
      console.log(pokemon)
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
  <div class="page">
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
            <h1>{{ pokemonObject.name.toUpperCase() }}</h1>
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
  </div>
</template>


<style scoped>
  .page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap : 20px;
    margin-top: 150px;
  }

  .pokemon-container {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    max-width: 800px;
    margin: 0 auto;
  }

  .pokemon-image img {
    max-width: 100%;
    width: 250px;
    height: auto;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #000;
    background-color: var(--color-yellow-pokemon);
  }

  .pokemon-image{
    background-color: var(--color-red-pokemon);
    border-radius: 10%;
    height: 300px;
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pokemon-infos {
    max-width: 500px;
  }

  .type-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .pokemon-types {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  h1{
    color: var(--color-red-pokemon);
    font-weight: bold;
  }

</style>
