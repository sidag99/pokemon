<template>
    <div>
        <nav-bar />
        <search-bar v-model="searchString"/>
        <pokemon-grid :search-string="searchString"/>
    </div>
</template>

<script lang="ts" setup>
import NavBar from "@/components/NavBar.vue";
import SearchBar from "@/components/SearchBar.vue";
import PokemonGrid from "@/components/PokemonGrid.vue";
import {ref} from "vue";

const searchString = ref<string>("");
</script>

<style scoped>

</style>