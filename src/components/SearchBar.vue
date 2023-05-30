<template>
    <input type="search" class="search-bar" placeholder="Search using name or type" :value="model" @input="event => doSearch(event.target.value)">
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps({
    modelValue: {type: String, required: true}
})
const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>();
const model = ref<string>(props.modelValue);

onMounted(() => {
    const storedSearchItem = localStorage.getItem("lastSearch");
    if (storedSearchItem) {
        doSearch(storedSearchItem);
    }
})

let delayTimer: number;

function doSearch(searchString: string) {
    clearTimeout(delayTimer);
    model.value = searchString;
    delayTimer = setTimeout(function() {
        emits('update:modelValue', searchString);
        addLastSearchToStore(searchString);
    }, 500);
}

function addLastSearchToStore(searchString: string) {
    localStorage.setItem("lastSearch", searchString);
}
</script>

<style scoped>

</style>