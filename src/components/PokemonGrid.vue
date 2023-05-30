<template>
    <template v-if="mounted">
        <pokemon-random-carousel v-if="allPokemonLength === filteredPokemonLength" :all-pokemon="allPokemon!" @update:pokemon="addPokemonFavouritesToLocalStorage"/>
        <template v-if="!loading">
            <pagination :total-items="filteredPokemonLength" v-model="pageNumber" :per-page="perPage"/>
            <div style="margin-top: 10px">
                <div v-for="rowNum in totalRows" :key="rowNum" class="carousel" style="margin-top: 10px">
                    <template v-for="pokemon in getPokemonRow(rowNum)" :key="pokemon.id">
                        <div class="column"  :id="pokemon.id">
                            <pokemon-card :model-value="pokemon" @update:pokemon="addPokemonFavouritesToLocalStorage"/>
                        </div>
                    </template>
                </div>
            </div>
        </template>
    </template>
</template>

<script lang="ts" setup>
import PokemonCard from "@/components/PokemonCard.vue";
import {Pokemon} from "@/models/Pokemon";
import {computed, nextTick, onMounted, ref, watch} from "vue";
import {usePokemonManager} from "@/service/pokemon-manager";
import PokemonRandomCarousel from "@/components/PokemonRandomCarousel.vue";
import Pagination from "@/components/Pagination.vue";

const {getAllPokemon} = usePokemonManager();
const props = defineProps({
    searchString: {type: String, required: true},
    sortValue: {type: String, required: true},
    showOnlyFavourites: {type: Boolean, required: true}
})
const rowSize = 10;
const perPage = 30;
const allPokemon = ref<Pokemon[]>();
const loading = ref<boolean>(true);
const mounted = ref<boolean>(false);
const totalRows = computed(() => paginatedPokemonList.value? Math.ceil(paginatedPokemonLength.value!/rowSize) : 0)
const filteredPokemon = ref<Pokemon[]>();
const allPokemonLength = computed(() => allPokemon.value? allPokemon.value.length : 0);
const filteredPokemonLength = computed(() => filteredPokemon.value? filteredPokemon.value.length : 0);
const paginatedPokemonLength = computed(() => paginatedPokemonList.value? paginatedPokemonList.value.length : 0);
const paginatedPokemonList = computed(() => filteredPokemon.value?.slice((pageNumber.value - 1)*perPage, pageNumber.value*perPage));
const pageNumber = ref<number>(1);

onMounted(async () => {
 await fetchAllPokemon();
})
async function fetchAllPokemon() {
    allPokemon.value = await getAllPokemon();
    const favourites: number[] = localStorage.getItem("favourites")? (localStorage.getItem("favourites") as string).split(',').map(num => parseInt(num, 10)) : [];
    if (favourites.length) {
        allPokemon.value!.forEach(pokemon => favourites.some(num => num === pokemon.id) ? pokemon.favourite = true : null);
    }
    await applySearchFilter(props.searchString);
    mounted.value = true;
}

function getPokemonRow(rowNum: number) {
    return paginatedPokemonList.value!.slice((rowNum-1)*rowSize, rowNum*rowSize < filteredPokemonLength.value!? rowNum*rowSize : filteredPokemonLength.value);
}

async function applySearchFilter(searchValue: string) {
    if (props.searchString && props.searchString.length != 0) {
        filteredPokemon.value = allPokemon.value!.filter(pokemon => (pokemon.name.toLowerCase().includes(searchValue.toLowerCase())) || pokemon.types.some(type => type.type.name.toLowerCase().includes(searchValue.toLowerCase())));
    }
    else {
        filteredPokemon.value = allPokemon.value;
    }
    if (props.showOnlyFavourites) {
        filteredPokemon.value = filteredPokemon.value!.filter(pokemon => pokemon.favourite);
    }
    pageNumber.value = 1;
    await applySort();
}

async function applySort() {
    loading.value = true;
    if (filteredPokemonLength.value > 0) {
        filteredPokemon.value = doSort(props.sortValue)!;
    }
    await nextTick(() => loading.value = false)
}

function doSort(sortValue: string) {
    switch (sortValue) {
        case 'name_asc': return filteredPokemon.value!.sort((a, b) => compareFn(a.name, b.name));
        case 'name_desc': return filteredPokemon.value!.sort((a, b) => compareFn(a.name, b.name, false));
        case 'height_inc': return filteredPokemon.value!.sort((a, b) => compareFn(a.height, b.height));
        case 'height_dec': return filteredPokemon.value!.sort((a, b) => compareFn(a.height, b.height, false));
        case 'weight_inc': return filteredPokemon.value!.sort((a, b) => compareFn(a.weight, b.weight));
        case 'weight_dec': return filteredPokemon.value!.sort((a, b) => compareFn(a.weight, b.weight, false));
        default: return filteredPokemon.value!.sort((a,b) => compareFn(a.id, b.id));
    }
}

function compareFn(a: string | number, b: string| number, inc = true) {
    if (typeof a === "string" && typeof b === "string") {
        const nameA = a.toUpperCase(); // ignore upper and lowercase
        const nameB = b.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return inc? -1 : 1;
        }
        if (nameA > nameB) {
            return inc ? 1 : -1;
        }
        return 0;
    }
    else if (typeof a === "number" && typeof b === "number"){
        return inc? (a - b) : (b - a);
    }
    return 0;
}

watch(() => props.searchString, () => {
    applySearchFilter(props.searchString)
})

watch(() => props.sortValue, () => {
    applySort()
})

watch(() => props.showOnlyFavourites, () => {
    applySearchFilter(props.searchString)
})

watch(pageNumber,async () => {
    loading.value = true;
    await nextTick(() => loading.value = false)
})

function addPokemonFavouritesToLocalStorage() {
    localStorage.setItem("favourites", allPokemon.value!.filter(pokemon => pokemon.favourite).map(pokemon => pokemon.id).join(','));
}
</script>

<style scoped>

</style>