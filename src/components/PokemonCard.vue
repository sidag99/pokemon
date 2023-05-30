<template>
    <div class="card gradient-border tooltip" :style="pokemon.style" @mouseover="rotateImage(false)" @mouseleave="rotateImage(true)">
        <div class="tooltip-text">
            <table>
                <tr>
                    <td>Abilities: </td>
                    <td>{{abilities.length > 5? `${abilities.slice(0,5).join(', ')}, (${abilities.slice(5, abilities.length).length} more)` : abilities.slice(0,5).join(', ')}}</td>
                </tr>
                <tr>
                    <td style="border-top: 1px solid white;">Moves: </td>
                    <td style="border-top: 1px solid white;">{{moves.length > 5? `${moves.slice(0,5).join(', ')}, (${moves.slice(5, moves.length).length} more)` : moves.slice(0,5).join(', ')}}</td>
                </tr>
            </table>
        </div>
        <button class="favourite" type="button" @click="markFavourite">
            <img v-if="!pokemon.favourite" src="../assets/icons/star_border.svg" height="20" width="20"/>
            <img v-else src="../assets/icons/star.svg" height="20" width="20"/>
        </button>
        <div class="heading">{{pokemon.name}}</div>

        <table class="characteristics gradient-border" style="margin-bottom: 2px" :style="pokemon.style">
            <tr>
                <td colspan="2">
                    <div class="img-holder">
                        <img v-show="showFront" class="avatar" :src="pokemon.sprites.front_default" />
                        <img v-show="!showFront" class="avatar" :src="pokemon.sprites.back_default" />
                    </div>
                </td>
            </tr>
            <tr>
                <td class="sub-heading">Height:</td>
                <td class="sub-heading bold">{{pokemon.height}}</td>
            </tr>
            <tr>
                <td class="sub-heading">Weight: </td>
                <td class="sub-heading bold">{{pokemon.weight}}</td>
            </tr>
        </table>
        <template v-for="type in pokemon.types">
            <div class="pill gradient-border sub-heading" :style="pokemon.style">{{type.type.name}} </div>
        </template>
    </div>
</template>

<script lang="ts" setup>

import { computed, onBeforeUnmount, onMounted, PropType, ref } from "vue";
import {Pokemon} from "@/models/Pokemon";

const props = defineProps({
    modelValue: {type: Object as PropType<Pokemon>, required: true}
})
const emits = defineEmits<{
    (e: 'update:pokemon'): void
}>();

const pokemon = ref<Pokemon>(props.modelValue);
onMounted(() => {
    if (!pokemon.value.style) {
        pokemon.value.style = getRandomBackgroundColour();
    }
})
onBeforeUnmount(() => {
    rotateImage(true);
})
const showFront = ref<boolean>(true);
const mouseHover = ref();
function rotateImage(endRotate = false) {
    if (endRotate && mouseHover.value) {
        clearInterval(mouseHover.value);
        mouseHover.value = undefined;
        showFront.value = true;
        return;
    }
    if (!mouseHover.value) {
        mouseHover.value = setInterval(() => {
            showFront.value = !showFront.value;
        }, 500);
    }
}
function getRandomBackgroundColour() {
    return  {
        "backgroundImage": `linear-gradient(45deg, rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}), rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}), rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}))`
    }
}
function markFavourite(pokemonID: number) {
    pokemon.value.favourite = !pokemon.value.favourite;
    emits("update:pokemon")
}

const moves = computed(() => pokemon.value.moves.map(move => move.move.name))
const abilities = computed(() => pokemon.value.abilities.map(ability => ability.ability.name))
</script>

<style scoped>
table {
    padding: 5px;
}
td {
    padding: 2px;
}

/* Tooltip text */
.tooltip .tooltip-text {
    visibility: hidden;
    width: 8.5vw;
    background-color: black;
    font-weight: bold;
    color: white;
    text-align: start;
    padding: 0;
    border-radius: 0.75vw;
    font-size: 0.5vw;
    opacity: 0;
    bottom: 1%;
    left: 1%;
    position: absolute;
    z-index: 1;
    transition: 0.3s opacity ease;
}

.tooltip:hover .tooltip-text {
    visibility: visible;
    opacity: 0.8;
}
.tooltip-text td {
    text-transform: capitalize;
}
</style>