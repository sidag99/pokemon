<template>
    <div class="card gradient-border" :style="pokemon.style">
        <button class="favourite" type="button" @click="markFavourite">
            <img v-if="!pokemon.favourite" src="../assets/icons/star_border.svg" height="20" width="20"/>
            <img v-else src="../assets/icons/star.svg" height="20" width="20"/>
        </button>
        <div class="heading">{{pokemon.name}}</div>

        <table class="characteristics gradient-border" style="margin-bottom: 2px" :style="pokemon.style">
            <tr>
                <td colspan="2">
                    <div class="img-holder">
                        <img class="avatar" :src="pokemon.sprites.front_default" />
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

import {onMounted, PropType, ref} from "vue";
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
function getRandomBackgroundColour() {
    return  {
        "backgroundImage": `linear-gradient(45deg, rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}), rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}), rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}))`
    }
}
function markFavourite(pokemonID: number) {
    pokemon.value.favourite = !pokemon.value.favourite;
    emits("update:pokemon")
}

</script>

<style scoped>
table {
    padding: 5px;
}
td {
    padding: 2px;
}
</style>