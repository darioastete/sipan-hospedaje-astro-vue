<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
const props = defineProps<{
  label: string;
  bg: string;
  amount: number;
}>();

const backColor = computed(() => `bg-[#${props.bg}]`);
</script>
<template>
  <div
    class="px-5 py-4 rounded-md flex hover:scale-105 hover:shadow-md transition-all bg-white items-center gap-5"
  >
    <label>{{ label }}</label>
    <div
      class="px-5 py-2 flex items-center rounded-xl text-white"
      :style="`background-color: #${bg};`"
    >
      {{ amount }}
    </div>
  </div>
</template>
