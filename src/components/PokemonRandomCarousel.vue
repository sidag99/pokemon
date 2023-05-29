<template>
    <div class="carousel-container">
        <div v-if="!loading" class="carousel">
            <template v-for="pokemon in randomPokemon" :key="pokemon.id">
                <div class="column">
                    <pokemon-card :model-value="pokemon"/>
                </div>
            </template>
        </div>
    </div>

</template>

<script lang="ts" setup>

import {Pokemon} from "@/models/Pokemon";
import {onMounted, ref} from "vue";
import {usePokemonManager} from "@/service/pokemon-manager";
import PokemonCard from "@/components/PokemonCard.vue";
const {getNRandomPokemon} = usePokemonManager()

const randomPokemon = ref<Pokemon[]>([]);
const loading = ref<boolean>(true);

onMounted(async () => {
    await fetchRandomPokemon()
    // setInterval(fetchRandomPokemon, 5000)
})

async function fetchRandomPokemon() {
    loading.value = true;
    randomPokemon.value = await getNRandomPokemon();
    loading.value = false;
}
</script>

<style scoped>
.carousel-container {
    background-color: yellow;
    padding: 10px 5px;
    margin: 5px 0px;
    border: 4px solid rgba(196, 45, 18, 0.71);
    border-radius: 10px;
}
</style>