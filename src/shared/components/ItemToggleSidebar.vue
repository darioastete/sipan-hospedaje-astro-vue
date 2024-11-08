<script lang="ts" setup>
import { defineProps, ref } from "vue";
interface Props {
	href: string;
	text: string;
	subRoutes: any[];
}
defineProps<Props>();

const visible = ref(false);

const toggle = () => {
	visible.value = !visible.value;
};
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
      <span>{{ text }}</span>
      <slot name="closedToggle" v-if="!visible" />
      <slot name="openedToggle" v-else />
    </div>
    <transition name="slider">
      <div :class="`flex flex-col`" v-if="visible">
        <template v-for="route in subRoutes" :key="route.href">
          <a :href="route.href" class="py-4 pl-5 hover:bg-gray-100">
            {{ route.text }}
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
