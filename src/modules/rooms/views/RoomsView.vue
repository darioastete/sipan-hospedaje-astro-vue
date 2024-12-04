<script setup lang="ts">
import iLoader from "@icon/loader-blue.svg";
import FilterRooms from "@room/components/FilterRooms.vue";
import ModalRoom from "@room/components/ModalRoom.vue";
import RoomCard from "@room/components/RoomCard.vue";
import type { RoomResponse } from "@room/types/IRooms";
import { onMounted, ref } from "vue";

import { useFilter } from "@room/composables/filterRoomComposable";

import { useHttp } from "@composables/useHttpUniversal.composable";
import { METHOD_HTTP } from "@type/MethodsHttp.const";

const { executeRequest: getListAll, error, loading, result } = useHttp();
const { filterRoom, loadingSearch, roomsResult } = useFilter();

const {
	executeRequest: getListDocumentType,
	error: errorDocumentType,
	loading: loadingDocumentType,
	result: documentTypes,
} = useHttp();

interface StatusRoom {
	result: [
		{
			id: string;
			color: string;
		},
	];
}
const statusRoomComponent = ref<StatusRoom>({
	result: [{ id: "", color: "" }],
});

const statusModal = ref<string>("available");

const returnRooms = async () => {
	await filterRoom(
		result,
		formFilters.value.statusRoom,
		formFilters.value.flat,
		formFilters.value.categoryRoom,
	);
};

const mounted = async () => {
	await getListDocumentType(METHOD_HTTP.GET, "documentype");
	await getListAll(METHOD_HTTP.GET, "room");
	returnRooms();
};

onMounted(async () => {
	await mounted();
});
const getColorForRoom = (idFilter: string) => {
	const filter = statusRoomComponent.value.result.find(
		(f) => f.id === idFilter,
	);
	return filter?.color ? `${filter.color}` : "";
};

const cleanFilters = () => {
	formFilters.value = {
		flat: "",
		statusRoom: "",
		categoryRoom: "",
	};
	returnRooms();
};

const onCreate = async () => {
	await mounted();
};

const room = ref<RoomResponse>();
const isModalOpen = ref(false);

const openModal = (roomSelect: any) => {
	// console.log(roomSelect);
	isModalOpen.value = true;
	room.value = roomSelect.room;
	statusModal.value = roomSelect.status;
	// room.value = room;
};

const formFilters = ref<{
	flat: string;
	statusRoom: string;
	categoryRoom: string;
}>({
	flat: "",
	statusRoom: "",
	categoryRoom: "",
});
</script>
<template>
  <div class="w-full h-full">
    <FilterRooms
      v-model:flat="formFilters.flat"
      v-model:status-room="formFilters.statusRoom"
      v-model:category-room="formFilters.categoryRoom"
      v-model:status-room-component="statusRoomComponent"
      @change="returnRooms"
      @cleanFilters="cleanFilters"
    />
    <div
      :class="`flex flex-col w-full sm:px-10 overflow-y-auto${
        formFilters.categoryRoom || formFilters.flat || formFilters.statusRoom
          ? 'h-[77%]'
          : 'h-[82%]'
      }`"
    >
      <template v-if="!loading && !loadingSearch && !loadingDocumentType">
        <template
          v-for="(flat, key) in roomsResult"
          v-if="Object.keys(roomsResult).length != 0"
        >
          <div class="bg-white mb-5 py-5 rounded-lg">
            <span class="font-normal text-sm px-5">{{ key }}</span>
            <div
              class="flex justify-center sm:justify-start py-5 gap-3 sm:gap-5 flex-wrap px-3"
            >
              <template
                v-for="(room, index) in flat"
                :key="index"
                v-if="flat.length > 0"
              >
                <RoomCard
                  :data="room"
                  :color="getColorForRoom(room.id_status_room)"
                  :number="room.number"
                  @openModal="openModal"
                />
              </template>
              <template v-else>
                <div class="w-full">
                  <h1 class="text-xl text-center">No existen habitaciones</h1>
                </div>
              </template>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="flex justify-center mt-7">
            <span>No hay habitaciones que mostrar</span>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="text-center py-4">
          <div class="flex gap-2 justify-center items-center">
            <img :src="iLoader.src" class="animate-spin" />
            <span class="text-xl">Cargando ..</span>
          </div>
        </div>
      </template>
    </div>
  </div>

  <ModalRoom
    v-if="isModalOpen"
    v-model:isModalOpen="isModalOpen"
    :color="room ? getColorForRoom(room.id_status_room) : ''"
    :number="room ? room.number : 0"
    @onCreate="onCreate"
    :services-room="room ? room.services : []"
    :status="room ? room.id_status_room : ''"
    :flat-name="room ? room.flat_name : ''"
    :category-name="room ? room.category_name : ''"
    :idroom="room ? room.id : ''"
    :document-types="documentTypes"
    :label-status="room ? room.status_room_info.description : ''"
    v-model:statusModal="statusModal"
  >
  </ModalRoom>
</template>
