<template>
    <div>

        <input type="search" class="search-bar" placeholder="Search using name or type" @input="event => doSearch(event.target.value)">
        {{model}}
    </div>
</template>

<script setup lang="ts">
import {PropType} from "vue/dist/vue";
import {Pokemon} from "@/models/Pokemon";
import {ref} from "vue";

const props = defineProps({
    modelValue: {type: String, required: true}
})
const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>();
const model = ref<string>(props.modelValue);

let delayTimer: number;

function doSearch(searchString: string) {
    clearTimeout(delayTimer);
    model.value = searchString;
    delayTimer = setTimeout(function() {
        emits('update:modelValue', searchString)
    }, 1000);
}
</script>

<style scoped>

</style>