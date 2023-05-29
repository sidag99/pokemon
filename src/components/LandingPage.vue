<template>
    <div>
        <nav-bar />
        <search-bar/>
        <pokemon-random-carousel/>
        <pokemon-grid/>
    </div>
</template>

<script lang="ts" setup>
import PokemonRandomCarousel from "@/components/PokemonRandomCarousel.vue";
import NavBar from "@/components/NavBar.vue";
import SearchBar from "@/components/SearchBar.vue";
import PokemonGrid from "@/components/PokemonGrid.vue";
</script>

<style scoped>

</style>