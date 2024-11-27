<script lang="ts">
import { usePokemonsStore } from "@/stores/usePokemonsStore";
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = usePokemonsStore();
    const router = useRouter();
    const goToPokemonDetails = (pokemonId: number) => {
      router.push({ name: 'pokemon_details', params: { id: pokemonId } });
    };

    return {
      store,
      goToPokemonDetails
    };
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

<template>
  <div v-if="store.userLogged" class="favorites-page">
    <h1 class="page-title">Favorites</h1>

    <div v-if="favorites.length" class="container">
      <div class="favorites-list">
        <div v-for="pokemon in favorites" :key="pokemon.id" class="favorite-item" @click="goToPokemonDetails(pokemon.id)">
          <img :src="pokemon.img_url" :alt="pokemon.name" class="pokemon-image" />
          <span class="pokemon-name">{{ pokemon.name.toUpperCase() }}</span>
          <button @click.stop="removeFromFavorites(pokemon.id)" class="remove-button">Delete</button>
        </div>
      </div>
    </div>

    <p v-else class="no-favorites">No favorite Pokemon yet</p>
  </div>
</template>

<style scoped>
.favorites-page {
  background-color: var(--color-background);
  padding: 2rem 0;
  padding-top: 100px;
}

.page-title {
  padding: 1rem;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
}

.favorites-list {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
  padding: 1rem;
}

.favorite-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.pokemon-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 8px;
}

.pokemon-name {
  flex-grow: 1;
  font-size: 1.1rem;
  font-weight: bold;
}

.remove-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 6px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-button:hover {
  background-color: #c0392b;
}

.no-favorites {
  text-align: center;
  color: #888;
  font-style: italic;
  margin-top: 2rem;
}

@media (max-width: 1024px) {
  /* Sur les écrans de taille moyenne, passer à 2 colonnes */
  .favorites-list {
    grid-template-columns: 1fr 1fr;
  }

  .pokemon-image {
    width: 80px;
    height: 80px;
  }

  .pokemon-name {
    font-size: 1rem;
  }

  .remove-button {
    margin-top: 10px;
  }
}

@media (max-width: 768px) {
  /* Sur les petits écrans, passer à 1 seule colonne */
  .favorites-list {
    grid-template-columns: 1fr;
  }

  .favorite-item {
    flex-direction: row;
    align-items: center;
  }

  .pokemon-image {
    width: 70px;
    height: 70px;
  }

  .pokemon-name {
    font-size: 0.9rem;
  }

  .remove-button {
    padding: 5px 10px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  /* Sur très petits écrans, ajuster encore plus les tailles */
  .page-title {
    font-size: 1.5rem;
  }

  .pokemon-name {
    font-size: 0.8rem;
  }

  .pokemon-image {
    width: 50px;
    height: 50px;
  }

  .remove-button {
    font-size: 0.8rem;
    padding: 4px 8px;
  }
}
</style>
