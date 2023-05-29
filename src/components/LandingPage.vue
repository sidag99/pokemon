<template>
    <div>
        <nav-bar />
        <search-bar v-model="searchString"/>
        <sort-order-selector v-model="sortOrder"/>
        <pokemon-grid :search-string="searchString" :sort-value="sortOrder"/>
    </div>
</template>

<script lang="ts" setup>
import NavBar from "@/components/NavBar.vue";
import SearchBar from "@/components/SearchBar.vue";
import PokemonGrid from "@/components/PokemonGrid.vue";
import {ref} from "vue";
import SortOrderSelector from "@/components/SortOrderSelector.vue";

const searchString = ref<string>("");
const sortOrder = ref<string>('none');
</script>

<style scoped>

</style>