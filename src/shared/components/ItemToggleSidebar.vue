<script lang="ts" setup>
import { defineProps, ref } from "vue";
interface Props {
	href: string;
	text: string;
	icon: string;
	subRoutes: SubRoute[];
}
interface SubRoute extends Omit<Props, "subRoutes"> {}
const { subRoutes } = defineProps<Props>();

const visible = ref(false);

const toggle = () => {
	visible.value = !visible.value;
};

// Importar todos los íconos de la carpeta assets/icons
const icons = import.meta.glob("/src/assets/icons/menu/*.svg");

// Referencia para el ícono seleccionado
const iconSrc = ref<any>(null);

// Cargar el ícono seleccionado
// if (icon && icons[`/src/assets/icons/menu/${icon}.svg`]) {
//   icons[`/src/assets/icons/menu/${icon}.svg`]().then((module) => {
//     iconSrc.value = (module as { default: string }).default;
//   });
// }

// const getIcon = async (iconName: string): Promise<string | null> => {
//   const iconPath = `/src/assets/icons/menu/${iconName}.svg`;
//   if (icons[iconPath]) {
//     const module = await icons[iconPath]();
//     return (module as { default: string }).default;
//   }
//   return null;
// };

// const iconSrcs = ref<any>({});
// onMounted(async () => {
//   for (const route of subRoutes) {
//     iconSrcs.value[route.icon] = await getIcon(route.icon);
//   }
//   console.log(iconSrcs.value);
// });
</script>
<template>
  <div
    :id="`toggle-${href}`"
    :class="`flex flex-col justify-between ${visible && 'bg-gray-50'}`"
  >
    <div
      :class="`flex justify-between items-center hover:bg-gray-100 px-2 py-4`"
      @click="toggle"
    >
      <div class="flex gap-3 items-center">
        <img :src="icon" class="sm:w-9" />
        <span :class="`${visible ? 'font-bold' : 'font-normal'}`">{{
          text
        }}</span>
      </div>
      <slot name="closedToggle" v-if="!visible" />
      <slot name="openedToggle" v-else />
    </div>
    <transition name="slider">
      <div :class="`flex flex-col`" v-if="visible">
        <template v-for="route in subRoutes" :key="route.href">
          <a
            :href="route.href"
            class="py-4 pl-5 hover:bg-gray-100 flex items-center gap-3"
          >
            <img :src="route.icon" class="w-7" />
            <span>{{ route.text }}</span>
          </a>
        </template>
      </div>
    </transition>
  </div>
</template>

<style>
.slider-enter-active {
  transition: all 0.3s ease-out;
}

.slider-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slider-enter-from,
.slider-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
