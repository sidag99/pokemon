<template>
    <select name="Sort On" id="sort" v-model="model" class="sort-select">
        <option v-for="option in sortOptions" :value="option.value">{{ option.label }}</option>
    </select>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
    modelValue: {type: String, required: true}
})
const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>();
const model = ref<string>(props.modelValue);

let delayTimer: number;
const pokemonSortOptions = [
    {label: 'Sort Order: None', value: 'none'},
    {label: 'Name Ascending', value: 'name_asc'},
    {label: 'Name Descending', value: 'name_desc'},
    {label: 'Height Increasing', value: 'height_inc'},
    {label: 'Height Decreasing', value: 'height_dec'},
    {label: 'Weight Increasing', value: 'weight_inc'},
    {label: 'Weight Decreasing', value: 'weight_dec'}
]
const sortOptions = ref([...pokemonSortOptions]);

watch(model, (n) => {
    {
        clearTimeout(delayTimer);
        model.value = n;
        emits('update:modelValue', n)
    }
})
</script>

<style scoped>

</style>