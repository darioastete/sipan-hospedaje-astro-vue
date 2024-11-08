<script setup lang="ts">
import closeXIcon from "@icon/close-x.svg";
import leftBlackArrowIcon from "@icon/left-black-arrow.svg";
import { ref } from "vue";

withDefaults(
	defineProps<{
		modelValue?: boolean;
		title?: string;
		hasBackIcon?: boolean;
		hasCloseIcon?: boolean;
		hasMobileMode?: boolean;
		size?: string;
	}>(),
	{
		modelValue: true,
		title: "",
		hasBackIcon: false,
		hasCloseIcon: true,
		hasMobileMode: true,
		size: "xs",
	},
);

const emit = defineEmits<{
	(e: "update:modelValue", modelValue: boolean): void;
	(e: "onClose", modelValue: boolean): void;
	(e: "onBack", modelValue: boolean): void;
}>();

let startY = 0;
let currentY = 0;
const modalTranslateY = ref(""); // Inicializa la variable reactiva para la transformación
const isDragging = ref(false);

const sizes = {
	xs: "!w-[500px]",
	lg: "!w-[900px]",
	xl: "!w-[1200px]",
};

const closeModal = () => {
	modalTranslateY.value = "";
	isDragging.value = false; // Asegúrate de que la clase 'dragging' se elimina
	emit("onClose", false);
};

const handleBack = () => {
	emit("onBack", true);
};

const startDrag = (event: any) => {
	startY = event.touches[0].clientY;
	isDragging.value = true;
};

const onDrag = (event: any) => {
	currentY = event.touches[0].clientY;
	const deltaY = currentY - startY;

	if (deltaY > 0) {
		// Asegúrate de que solo se mueva hacia abajo
		modalTranslateY.value = `translateY(${deltaY}px)`;
	}
};

const endDrag = () => {
	const threshold = 100;
	if (Math.abs(currentY - startY) > threshold) {
		closeModal();
	} else {
		modalTranslateY.value = "";
		isDragging.value = false; // Restablece la clase 'dragging'
	}
};

const getSizeModal = () => {};
</script>
<template>
  <transition name="fade" appear>
    <!-- Fondo Opaco Oscuro -->
    <div
      v-show="modelValue"
      class="absolute inset-0 h-screen bg-black bg-opacity-60"
    ></div>
  </transition>
  <transition name="slide-up" appear>
    <div
      v-show="modelValue"
      @click.self="closeModal"
      class="fixed inset-0 z-10 h-full w-full overflow-y-auto"
    >
      <!-- Contenido del Modal -->
      <div
        :style="{ transform: modalTranslateY }"
        :class="`${
          !hasMobileMode
            ? '!right-1/2 !top-1/2 !h-fit  !-translate-y-1/2  !translate-x-1/2 !transform !rounded-[4px] !px-[24px] !py-[20px] max-w-[90%]'
            : ''
        } ${!hasMobileMode ? sizes[size] : ''}`"
        class="absolute bottom-0 z-10 flex w-full flex-col gap-[24px] rounded-t-[20px] border-[1px] border-white bg-white p-[16px] pt-[8px] shadow-popup sm:right-1/2 sm:top-1/2 sm:h-fit sm:w-3/4 sm:-translate-y-1/2 sm:translate-x-1/2 sm:transform sm:rounded-[4px] sm:p-[24px] sm:pt-[36px]"
      >
        <!-- Header -->
        <div
          v-show="hasBackIcon || title !== '' || hasCloseIcon || hasMobileMode"
          class="flex flex-col"
        >
          <!-- Barra gris para hacer dragging -->
          <div
            v-show="hasMobileMode"
            class="h-[20px] sm:hidden"
            @touchstart="startDrag"
            @touchmove="onDrag"
            @touchend="endDrag"
          >
            <span
              class="m-0 mx-auto block h-[4px] w-[54px] rounded-[100px] bg-white"
            ></span>
          </div>
          <!-- Contenido del header -->
          <div
            v-show="hasBackIcon || title !== '' || hasCloseIcon"
            class="flex items-center justify-between"
          >
            <div class="h-[24px] w-[24px]">
              <button v-show="hasBackIcon" @click="handleBack">
                <img
                  :src="leftBlackArrowIcon.src"
                  alt="Botón para retroceder al modal anterior"
                />
              </button>
            </div>
            <div>
              <p class="text-center text-sm font-regular text-black">
                {{ title }}
              </p>
            </div>
            <div class="h-[24px] w-[24px]">
              <button v-show="hasCloseIcon" @click="closeModal">
                <img
                  :src="closeXIcon.src"
                  class="p-[5px]"
                  width="24px"
                  height="24px"
                  alt="Botón en forma de 'X' para cerrar el modal"
                />
              </button>
            </div>
          </div>
        </div>
        <!-- Main -->
        <slot name="main"></slot>
        <!-- Footer -->
        <slot name="footer"></slot>
      </div>
    </div>
  </transition>
</template>

<style>
/* Estilos para la transición de opacidad del fondo */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Estilos para la transición de deslizamiento del contenido del modal */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}

.slide-up-enter-from {
  transform: translateY(100%);
}

.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
}

.slide-up-leave-to {
  transform: translateY(100%);
}

.modal.dragging {
  /* Estilo aplicado cuando se está arrastrando el modal */
  transition: transform 0.3s ease;
  transform: translateY(100vh); /* Mueve el modal fuera de la pantalla */
}
</style>
