<template>
    <template v-if="!loading">
        <pokemon-random-carousel v-if="!searchString" :all-pokemon="allPokemon!"/>
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
import {computed, nextTick, onMounted, ref, watch} from "vue";
import {usePokemonManager} from "@/service/pokemon-manager";
import PokemonRandomCarousel from "@/components/PokemonRandomCarousel.vue";

const {getAllPokemon} = usePokemonManager();
// const {} =
const props = defineProps({
    searchString: {type: String, required: true}
})
const rowSize = 6;
const allPokemon = ref<Pokemon[]>();
const loading = ref<boolean>(true);
const totalRows = computed(() => filteredPokemonLength.value? Math.ceil(filteredPokemonLength.value!/rowSize) : 0)
const filteredPokemon = ref<Pokemon[]>();
const filteredPokemonLength = computed(() => filteredPokemon.value? Math.ceil(filteredPokemon.value.length/rowSize) : 0)

onMounted(async () => {
 await fetchAllPokemon();
})
async function fetchAllPokemon() {
    loading.value = true;
    allPokemon.value = await getAllPokemon();
    filteredPokemon.value = allPokemon.value;
    loading.value = false;
}

function getPokemonRow(rowNum: number) {
    return filteredPokemon.value!.slice((rowNum-1)*rowSize, rowNum*rowSize < filteredPokemonLength.value!? rowNum*rowSize : filteredPokemonLength.value);
}

async function applySearchFilter(searchValue: string) {
    loading.value = true;
    filteredPokemon.value = allPokemon.value!.filter(pokemon => (pokemon.name.toLowerCase().includes(searchValue)) || pokemon.types.some(type => type.type.name.toLowerCase().includes(searchValue)));
    await nextTick(() => loading.value = false)
}

watch(() => props.searchString, () => {
    if (props.searchString && props.searchString.length != 0) {
        applySearchFilter(props.searchString!.toLowerCase())
    }
    else {
        filteredPokemon.value = allPokemon.value;
    }
})
</script>

<style scoped>

</style>