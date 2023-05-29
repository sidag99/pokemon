<template>
    <div class="card" :style="getRandomBackgroundColour()">
        <div class="heading">{{pokemon.name}}</div>
<!--        <a><img src="../assets/icons/star_border.svg"/></a>-->
        <table class="characteristics">
            <tr>
                <td>Height:</td>
                <td class="sub-heading">{{pokemon.height}}</td>
            </tr>
            <tr>
                <td>Weight: </td>
                <td class="sub-heading">{{pokemon.weight}}</td>
            </tr>
        </table>
        <div class="img-holder">
            <img :src="pokemon.sprites.front_default" />
        </div>
        <template v-for="type in pokemon.types">
            <div class="pill">{{type.type.name}} </div>
        </template>
    </div>
</template>

<script lang="ts" setup>

import {onMounted, PropType, ref} from "vue";
import {Pokemon} from "@/models/Pokemon";

const props = defineProps({
    modelValue: {type: Object as PropType<Pokemon>, required: true}
})

const pokemon = ref<Pokemon>(props.modelValue);

function getRandomBackgroundColour() {
    return  {

        backgroundColor: `hsl(${Math.random()* 360}, 100%, ${(50 + 30 * Math.random())}%)`
        // backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 100%)`
    }
}
</script>

<style scoped>
.characteristics {
    margin-top: 5px;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
    border-radius: 5px;
    padding: 10px;
    border: 1px rgba(128, 128, 128, 0.40) solid;
}

table, td {
    padding: 5px;
}
</style>