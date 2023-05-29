<template>
    <div class="carousel-container">
        <div v-if="!loading" class="carousel">
            <template v-for="pokemon in randomPokemon" :key="pokemon.id">
                <div class="column">
                    <pokemon-card :model-value="pokemon" @update:pokemon="emits('update:pokemon')"/>
                </div>
            </template>
        </div>
    </div>

</template>

<script lang="ts" setup>

import {Pokemon} from "@/models/Pokemon";
import {nextTick, onMounted, ref} from "vue";
import {usePokemonManager} from "@/service/pokemon-manager";
import PokemonCard from "@/components/PokemonCard.vue";
import {PropType} from "vue/dist/vue";
const {getNRandomNumbers} = usePokemonManager()

const randomPokemon = ref<Pokemon[]>([]);
const loading = ref<boolean>(true);


const props = defineProps({
    allPokemon: {type: Object as PropType<Pokemon[]>, required: true}
})
const emits = defineEmits<{
    (e: 'update:pokemon'): void
}>();

const randomCardsCount = 10;

onMounted(async () => {
    await fetchRandomPokemon()
    setInterval(fetchRandomPokemon, 5000)
})

async function fetchRandomPokemon() {
    loading.value = true;
    const n: number[] = getNRandomNumbers(randomCardsCount);
    randomPokemon.value = [];
    for (let i of n) {
        randomPokemon.value.push(props.allPokemon!.find(pokemon => pokemon.id === i)!);
    }
    await nextTick(() => loading.value = false);
}
</script>

<style scoped>
.carousel-container {
    background-image: linear-gradient(45deg, #FF0000, white, #FF0000);
    padding: 10px 5px;
    margin: 5px 0px;
    border: 1px solid black;
    border-radius: 10px;
}
</style>