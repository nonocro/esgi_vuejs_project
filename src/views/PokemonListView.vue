<script setup lang="ts">
import { usePokemonsStore } from '@/stores/usePokemonsStore';
import PokemonCard from '@/components/PokemonCard.vue'
import { ref, onMounted } from 'vue';
import type { PokemonType } from '@/interfaces/pokemonsTypes';
import type { TypeSlot } from '@/interfaces/typeInfos';

const pokemonsStore = usePokemonsStore()
const errorMessage = ref<string | null>(null);
let offset = 0;
const next = ref(null)

// Fonction pour récupérer les Pokémon
async function getPokemons(offset: number) {
  try {
    const response: Response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=500&offset='+offset.toString(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    next.value = result.next
    return result.results;
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error message: ', error.message);
      errorMessage.value = error.message;
    } else {
      console.log('Unexpected error: ', error);
      errorMessage.value = 'An unexpected error occurred';
    }
    return [];
  }
}

async function chargeMorePokemons(){
  const pokemons = await getPokemons(offset);
  for (const pokemon of pokemons) {
    const response: Response = await fetch(pokemon.url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      const result = await response.json();
      const pokemonTypes : PokemonType[] = []
      result.types.forEach((typeSlot : TypeSlot) => {
        const typeObject : PokemonType = {
          name: typeSlot.type.name,
          img_url: ''
        }
        pokemonTypes.push(typeObject)
      });
      pokemonsStore.addPokemon(
        {
          id: result.id,
          name: pokemon.name,
          img_url: result.sprites.front_default,
          types: pokemonTypes,
          weight: result.weight,
          height: result.height,
        }
      )
    }
  }
  offset+=500
}

// Charger les Pokémon à l'initialisation du composant
onMounted(async () => {
  chargeMorePokemons()
});
</script>

<template>
  <div class="page">
    <div class="container">
      <div v-for="pokemon in pokemonsStore.pokemons" :key="pokemon.id">
        <PokemonCard :id="pokemon.id"></PokemonCard>
      </div>
    </div>
    <button v-if="next != null" @click="chargeMorePokemons()" class="buttonMore">See More</button>
  </div>
</template>

<style>

  .page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap : 20px;
    margin-top: 150px;
  }

  .container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
  }

  .buttonMore{
    background-color: var(--color-yellow-pokemon);
    color: var(--color-red-pokemon);
    font-weight: bold;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }

  .buttonMore:hover{
    transform: scale(1.05);
  }

  @media (max-width: 1200px) {
    .container {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (max-width: 992px) {
    .container {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 768px) {
    .container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 480px) {
    .container {
      grid-template-columns: 1fr;
    }
  }
</style>
