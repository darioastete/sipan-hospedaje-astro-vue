<script lang="ts" setup>
import SelectComponent from "@components/SelectComponent.vue";
import { toRefs } from "vue";

// const PropsProxy = defineProps<{
//   flat: string;
//   statusRoom: string;
//   categoryRoom: string;
// }>();

const flat = defineModel("flat");
const statusRoom = defineModel("statusRoom");
const categoryRoom = defineModel("categoryRoom");
const statusRoomComponent = defineModel("statusRoomComponent");

// const { flat, statusRoom, categoryRoom } = toRefs(PropsProxy);

const emit = defineEmits(["change", "cleanFilters"]);

const returnRooms = () => {
	emit("change", {
		flat,
		statusRoom,
		categoryRoom,
	});
};
const cleanFilters = () => {
	emit("cleanFilters");
};
</script>

<template>
  <div class="flex justify-evenly py-5 sm:gap-4 lg:px-5 h-[15%]">
    <SelectComponent
      class="w-full"
      :label="'Piso'"
      optionLabel="description"
      optionValue="id"
      :pathGet="'flat'"
      v-model="flat"
      @change="returnRooms"
    />
    <SelectComponent
      class="w-full"
      :label="'Disponibilidad'"
      optionLabel="description"
      optionValue="id"
      :pathGet="'statusroom'"
      v-model="statusRoom"
      ref="statusRoomComponent"
      @change="returnRooms"
    />
    <SelectComponent
      class="w-full"
      :label="'categoria'"
      optionLabel="description"
      optionValue="id"
      :pathGet="'category'"
      v-model="categoryRoom"
      @change="returnRooms"
    />
  </div>
  <hr class="mx-5 h-[2%]" />
  <div
    class="flex justify-end mx-5 mt-3 sm:mr-6 h-[4%]"
    v-if="categoryRoom || flat || statusRoom"
  >
    <button
      @click="cleanFilters"
      class="px-3 py-2 bg-primary-danger-100 rounded-lg text-white text-xs"
    >
      X Quitar Filtros
    </button>
  </div>
</template>
