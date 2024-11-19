<script setup lang="ts">
import iBed from "@icon/bed-white.svg";

const { data } = defineProps<{
	number: string | number;
	color: string;
	data: any;
}>();

const emit = defineEmits<(e: "openModal", room: any) => void>();
//MODAL IMPORTS
const openModal = () => {
	// emit("openModal", { room: data });
	switch (data.status_room_info.description.toLowerCase()) {
		case "ocupado":
			emit("openModal", { room: data, status: "ocuped" });
			break;
		case "limpieza":
			emit("openModal", { room: data, status: "cleaning" });
			break;
		default:
			emit("openModal", { room: data, status: "available" });
			break;
	}
	console.log(data);
	// emit("openModal", { typeModal: "ocuped" });
	// emit("openModal", { typeModal: "clean" });
	// isModalOpen.value = true;
	// if (propsProxy.labelStatus.toLowerCase() === "ocupado") {
	//   findData();
	//   viewMode.value = true;
	// }
	// if (propsProxy.labelStatus.toLocaleLowerCase() === "limpieza") {
	//   viewCleanRoom.value = true;
	// }
};
</script>
<template>
  <div
    :class="`w-32 bg-white px-5 py-4 rounded-lg flex flex-col hover:scale-105 hover:shadow-md transition-all gap-1 cursor-pointer shadow-md`"
    @click="openModal"
  >
    <span class="text-2xl font-bold text-primary-blue-500">{{ number }}</span>
    <div class="flex text-right w-full justify-end">
      <img :src="iBed.src" alt="" class="opacity-10" />
    </div>
    <hr
      :class="`w-full h-1.5 border-0 rounded`"
      :style="`background-color: ${color};`"
    />
  </div>
</template>
