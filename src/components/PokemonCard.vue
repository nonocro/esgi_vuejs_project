<script setup lang="ts">
import { usePokemonsStore } from '@/stores/usePokemonsStore';
import { defineProps } from 'vue';
import { computed } from "vue";
import { useRouter } from 'vue-router';

const props = defineProps(['id'])

const router = useRouter();
const pokemonsStore = usePokemonsStore()
const pokemonInformation = pokemonsStore.getPokemonById(props.id)

const goToPokemonDetails = (pokemonId: number) => {
  router.push({ name: 'pokemon_details', params: { id: pokemonId } });
};

const isFavorite = computed(() =>
    pokemonsStore.favorites.some((fav) => fav.id === props.id)
);

const toggleFavorite = () => {
    if (pokemonsStore.userLogged) {
        if (isFavorite.value) {
            pokemonsStore.removeFavorite(props.id);
        } else {
            pokemonsStore.addFavorite(pokemonInformation);
        }
    }
};
</script>

<template>
    <div class="card" @click="goToPokemonDetails(pokemonInformation?.id || 0)">
        <div class="up">
            <img :src="pokemonInformation?.img_url" :alt="'Image du pokémon : ' + pokemonInformation?.name" />
            <button @click="toggleFavorite" class="favorite-btn" v-if="pokemonsStore.userLogged">
            <span v-if="isFavorite">🧡</span>
            <span v-else>🤍</span>
          </button>
        </div>
        <div class="bottom">
            <p>{{ pokemonInformation?.name.toUpperCase() }}</p>
        </div>
    </div>
</template>

<style>
.card {
    height: 200px;
    width: 200px;
    border-radius: 10%;
    overflow: hidden;
    position: relative;
}

.up {
    height: 150px;
    background-color: var(--color-red-pokemon);
    display: flex;
    justify-content: center;
    align-items: center;
}

.up img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #000;
    background-color: var(--color-yellow-pokemon);
}

.bottom {
    height: 50px;
    width: 200px;
    background-color: var(--color-orange-pokemon);
    display: flex;
    align-items: center;
    justify-content: center;
}

.bottom p {
    color: var(--color-red-pokemon);
    font-weight: bold;
    text-align: center;
}

.card:hover {
    transform: scale(1.05);
}

.favorite-btn {
    position: absolute;
    /* Positionner le bouton dans le coin supérieur droit */
    top: 10px;
    /* Espacement du bord supérieur */
    right: 10px;
    /* Espacement du bord droit */
    background: none;
    border: none;
    cursor: pointer;
    font-size: 2rem;
    transition: transform 0.3s ease, color 0.3s ease;
}

.favorite-btn:hover {
    transform: scale(1.2);
    color: #ff4081;
}

.favorite-btn span {
    transition: transform 0.2s ease;
}

.favorite-btn span:hover {
    transform: scale(1.3);
}
</style>
