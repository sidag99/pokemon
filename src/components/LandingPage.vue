<template>
    <div>
        <nav-bar />
        <search-bar v-model="searchString"/>
        <sort-order-selector v-model="sortOrder"/>
        <button class="favourite-btn" @click="showFavourites = !showFavourites">
            <span>Filter Favourites</span>
            <img v-if="!showFavourites" src="../assets/icons/star_border.svg" height="24" width="24" style="vertical-align: middle"/>
            <img v-else src="../assets/icons/star.svg" height="24" width="24" style="vertical-align: middle"/>
        </button>
        <pokemon-grid :search-string="searchString" :sort-value="sortOrder" :show-only-favourites="showFavourites"/>
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
const showFavourites = ref<boolean> (false);
</script>

<style scoped>
.favourite-btn {
    height: 40px;
    text-align: center;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #3B4CCA;
}

</style>