<template>
  <div v-if="store.userLogged" class="favorites-page">
    <div class="container">
      <h1 class="page-title">Mes favoris</h1>

      <div v-if="favorites.length" class="favorites-list">
        <div v-for="pokemon in favorites" :key="pokemon.id" class="favorite-item">
          <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" />
          <span class="pokemon-name">{{ pokemon.name }}</span>
          <button @click="removeFromFavorites(pokemon.id)" class="remove-button">Supprimer</button>
        </div>
      </div>
      
      <p v-else class="no-favorites">Aucun Pokémon favori pour le moment.</p>
    </div>
  </div>
</template>

<script>
import { usePokemonsStore } from "@/stores/usePokemonsStore";

export default {
  setup() {
    const store = usePokemonsStore();
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

@media (max-width: 768px) {
  .favorites-list {
    grid-template-columns: 1fr 1fr
  }

  .favorite-item {
    flex-direction: column;
    align-items: flex-start;
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
</style>