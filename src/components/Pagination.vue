<template>
  <div class="pagination">
    <button type="button" class="page-link" v-if="page != 1" @click="page = 1"> &lt;&lt; </button>
    <button type="button" class="page-link" v-if="page != 1" @click="page--"> &lt; </button>
    <button type="button" class="page-link" :class="page === pageNumber? 'selected-page' : ''" v-for="pageNumber in pages.slice(page-5 > 0? page - 5 : 0, page+5)" @click="page = pageNumber"> {{pageNumber}} </button>
    <button type="button" @click="page++" v-if="page < pages.length" class="page-link"> > </button>
    <button type="button" @click="page = pages[pages.length-1]" v-if="page < pages.length" class="page-link"> >> </button>
  </div>
</template>

<script lang="ts" setup>

import { onMounted, ref, watch } from "vue";

const props = defineProps({
  modelValue: {type: Number, required: true},
  totalItems: {type: Number, required: true},
  perPage: {type: Number, required: true}
})
const emits = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>();
const page = ref<number>(props.modelValue);
const pages = ref<number[]>([]);

onMounted(() => {
  setPages();
})
function setPages() {
  const pageCount = Math.ceil(props.totalItems/props.perPage);
  pages.value = [];
  for (let i = 1; i<= pageCount; i++) {
    pages.value.push(i);
  }
}

watch(page, () => {
  emits("update:modelValue", page.value)
})

watch(() => props.totalItems, () => {
  setPages();
})
</script>

<style scoped>
button.page-link {
    font-size: 12px;
    color: #FF0000;
    background-color: white;
    border: 1px solid #FF0000;
    border-radius: 5px;
    margin: 1px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.2s background-color ease-in-out;
}

button.page-link:hover {
    background-color: rgba(255, 0, 0, 0.2);
}

.selected-page {
    background-color: rgba(255, 0, 0, 0.4) !important;
}
</style>