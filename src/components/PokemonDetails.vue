<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const pokemonId = route.params.id.toString()
console.log(pokemonId)

//Récupérer le pokemon associé
//const pokemon = pokemonStore.getElementById(pokemonId)

</script>

<template>
  <h1>Test</h1>
</template>
