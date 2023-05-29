<template>
    <div>
        <select name="Sort On" id="sort" v-model="model">
            <option v-for="option in sortOptions" :value="option.value">{{ option.label }}</option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { pokemonSortOptions } from "@/models/constants";

const props = defineProps({
    modelValue: {type: String, required: true}
})
const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>();
const model = ref<string>(props.modelValue);

let delayTimer: number;

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