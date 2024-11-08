<script setup lang="ts">
import { ref } from "vue";
const { icon } = defineProps<{
  label: string;
  icon: string;
}>();

// Importar todos los íconos de la carpeta assets/icons
const icons = import.meta.glob("/src/assets/icons/menu/*.svg");

// Referencia para el ícono seleccionado
const iconSrc = ref<any>(null);

// Cargar el ícono seleccionado
if (icon && icons[`/src/assets/icons/menu/${icon}.svg`]) {
  icons[`/src/assets/icons/menu/${icon}.svg`]().then((module) => {
    iconSrc.value = (module as { default: string }).default;
  });
}
</script>
<template>
  <div
    class="px-3 py-2 sm:px-6 sm:py-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-slate-100 flex items-center gap-2 w-full sm:w-1/5"
  >
    <img v-if="iconSrc" :src="iconSrc.src" class="w-7 sm:w-14" />
    <h1 class="sm:text-sm">{{ label }}</h1>
  </div>
</template>
