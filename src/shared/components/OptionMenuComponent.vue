<script setup lang="ts">
const { icon } = defineProps<{
	label: string;
	icon: string;
}>();
</script>
<template>
  <div
    class="px-3 py-2 sm:px-6 sm:py-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-slate-100 flex items-center gap-2 w-full sm:w-1/5"
  >
    <img :src="icon" class="w-7 sm:w-14" />
    <h1 class="sm:text-sm">{{ label }}</h1>
  </div>
</template>
