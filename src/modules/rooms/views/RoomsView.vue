<script setup lang="ts">
import { ref } from "vue";
import RoomCard from "@room/components/RoomCard.vue";
import SelectComponent from "@components/SelectComponent.vue";
// import { useData } from "@composables/getListComposable";
import { onMounted } from "vue";
import iLoader from "@icon/loader-blue.svg";

import { useFilter } from "@room/composables/filterRoomComposable";
// import { useDocumentType } from "@composables/getListDocumentType";

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

const returnRooms = async () => {
  await filterRoom(
    result,
    formFilters.value.statusRoom,
    formFilters.value.flat,
    formFilters.value.categoryRoom
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

// const filters = [
//     { id: 1, name: "Limpieza", color: "0A2749" },
//     { id: 2, name: "Disponible", color: "CC922F" },
//     { id: 3, name: "Contrato", color: "CAA45D" },
//     { id: 4, name: "Ocupado", color: "DA3939" },
// ];

const getColorForRoom = (idFilter: string) => {
  const filter = statusRoomComponent.value.result.find(
    (f) => f.id === idFilter
  );
  return filter?.color ? `#${filter.color}` : "";
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

const formFilters = ref({
  flat: "",
  statusRoom: "",
  categoryRoom: "",
});
</script>
<template>
  <div class="w-full h-full">
    <div class="flex justify-evenly py-5 sm:gap-4 lg:px-5 h-[15%]">
      <SelectComponent
        class="w-full"
        :label="'Piso'"
        optionLabel="description"
        optionValue="id"
        :pathGet="'flat'"
        v-model="formFilters.flat"
        @change="returnRooms"
      />
      <SelectComponent
        class="w-full"
        :label="'Disponibilidad'"
        optionLabel="description"
        optionValue="id"
        :pathGet="'statusroom'"
        v-model="formFilters.statusRoom"
        ref="statusRoomComponent"
        @change="returnRooms"
      />
      <SelectComponent
        class="w-full"
        :label="'categoria'"
        optionLabel="description"
        optionValue="id"
        :pathGet="'category'"
        v-model="formFilters.categoryRoom"
        @change="returnRooms"
      />
    </div>
    <hr class="mx-5 h-[2%]" />
    <div
      class="flex justify-end mx-5 mt-3 sm:mr-6 h-[4%]"
      v-if="
        formFilters.categoryRoom || formFilters.flat || formFilters.statusRoom
      "
    >
      <button
        @click="cleanFilters"
        class="px-3 py-2 bg-primary-danger-100 rounded-lg text-white text-xs"
      >
        X Quitar Filtros
      </button>
    </div>
    <div
      :class="`flex flex-col w-full sm:px-10 overflow-y-auto py-5 ${
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
          <span class="font-semibold text-sm px-5">{{ key }}</span>
          <div
            class="flex justify-center sm:justify-start py-5 gap-3 sm:gap-5 flex-wrap"
          >
            <template
              v-for="(room, index) in flat"
              :key="index"
              v-if="flat.length > 0"
            >
              <RoomCard
                @onCreate="onCreate"
                :services-room="room.services"
                :status="room.id_status_room"
                :number="room.number"
                :flat-name="room.flat_name"
                :category-name="room.category_name"
                :color="getColorForRoom(room.id_status_room)"
                :idroom="room.id"
                :document-types="documentTypes"
                :label-status="room.status_room_info.description"
              />
            </template>
            <template v-else>
              <div class="w-full">
                <h1 class="text-xl text-center">No existen habitaciones</h1>
              </div>
            </template>
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
</template>
