<template>
    <template v-if="!loading">
        <div style="margin-top: 10px">
            <div v-for="rowNum in totalRows" :key="rowNum" class="carousel" style="margin-top: 10px">
                <template v-for="pokemon in getPokemonRow(rowNum)" :key="pokemon.id">
                    <div class="column">
                        <pokemon-card :model-value="pokemon"/>
                    </div>
                </template>
            </div>
        </div>
    </template>

</template>

<script lang="ts" setup>
import PokemonCard from "@/components/PokemonCard.vue";
import {Pokemon} from "@/models/Pokemon";
import {computed, onMounted, ref} from "vue";
import {usePokemonManager} from "@/service/pokemon-manager";

const {getAllPokemon} = usePokemonManager();
// const {} =

const rowSize = 5;
const allPokemons = ref<Pokemon[]>();
const loading = ref<boolean>(true);
const totalPokemons = ref<number>();
const totalRows = computed(() => totalPokemons? Math.ceil(totalPokemons.value!/rowSize) : 0)

onMounted(async () => {
 await fetchRandomPokemon();
})
async function fetchRandomPokemon() {
    loading.value = true;
    allPokemons.value = await getAllPokemon();
    totalPokemons.value = allPokemons.value.length!;
    loading.value = false;
}

function getPokemonRow(rowNum: number) {
    return allPokemons.value!.slice((rowNum-1)*rowSize, rowNum*rowSize < totalPokemons.value!? rowNum*rowSize : totalPokemons.value);
}
</script>

<style scoped>

</style>