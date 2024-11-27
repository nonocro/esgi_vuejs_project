<script setup lang="ts">
import { usePokemonsStore } from '@/stores/usePokemonsStore';
import { defineProps } from 'vue';

// Déclare les props
const props = defineProps(['id'])

const pokemonsStore = usePokemonsStore()
const pokemonInformation = pokemonsStore.getElementById(props.id)

</script>

<template>
    <div class="card">
        <div class="up">
            <img :src="pokemonInformation?.img_url" :alt="'Image du pokémon : ' + pokemonInformation?.name" />
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
}

.up{
    height: 150px;
    background-color: var(--color-red-pokemon);
    display: flex;
    justify-content: center;
    align-items: center;
}

.up img{
    width: 100px; 
    height: 100px; 
    border-radius: 50%; 
    object-fit: cover; 
    border: 2px solid #000;
    background-color: var(--color-yellow-pokemon);
}

.bottom{
    height: 50px;
    width: 200px;
    background-color: var(--color-orange-pokemon);
    display: flex;
    align-items: center;
    justify-content: center;
}

.bottom p{
    color: var(--color-red-pokemon);
    font-weight: bold;
    text-align: center;
}

.card:hover{
    transform: scale(1.05);
}

</style>