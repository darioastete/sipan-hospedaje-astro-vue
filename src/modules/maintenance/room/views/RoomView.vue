<script lang="ts" setup>
import ButtonComponent from "@components/ButtonComponent.vue";
import CrudLayout from "@layout/CrudLayout.vue";

import formComponent from "@maroom/components/formRoomComponent.vue";
// import type { RoomResponse } from "../types/room.response";
import { onMounted, ref } from "vue";

import { useHttp } from "@composables/useHttpUniversal.composable";
import { METHOD_HTTP } from "@type/MethodsHttp.const";

const {
	executeRequest: getListAll,
	loading,
	result,
	error: errorGet,
} = useHttp();
const {
	executeRequest: create,
	loading: loadingCreate,
	error: errorCreate,
} = useHttp();
const {
	executeRequest: update,
	loading: loadingUpdate,
	error: errorUpdate,
} = useHttp();
const {
	executeRequest: remove,
	loading: loadingRemove,
	error: errorRemove,
} = useHttp();

const {
	executeRequest: swapStatus,
	loading: loadingDisableRoom,
	result: resultDisableRoom,
	error: errorDisableRoom,
} = useHttp();

const crudComponent = ref();

const initialForm = {
	id: "",
	cost: "",
	id_category: "",
	id_flat: "",
	id_status_room: "",
	number: 0,
	category_info: {
		id: "",
		description: "",
		status: null,
	},
	category_name: "",
	flat_info: {
		id: "",
		description: "",
		status: null,
	},
	flat_name: "",
	services: [],
	servicess: [],
	status_room_info: {
		id: "",
		description: "",
		status: null,
	},
	status_room_name: "",
};

const form = ref<any>(initialForm);

const handleOpenModal = (item: any) => {
	if (item !== null) {
		const newitem = { ...item };
		form.value = newitem;
	} else {
		resetForm();
	}
};

const formComponentRef = ref();
const resetForm = () => {
	form.value = { ...initialForm };
	// formComponentRef.value.clearForm();
};

const sendCloseModal = () => {
	crudComponent.value.closeModal();
};

const makeData = async () => {
	await getListAll(METHOD_HTTP.GET, "room");
};

const createItem = async () => {
	// console.log("esta aqui?");
	await create(METHOD_HTTP.POST, "room", undefined, form.value);
	if (errorCreate.value) {
		// console.log("error");
		return;
	}
	sendCloseModal();
	makeData();
	resetForm();
};

const editItem = async () => {
	await update(METHOD_HTTP.PUT, "room", form.value.id, form.value);
	if (errorUpdate.value) return;
	sendCloseModal();
	makeData();
	resetForm();
};

const handleConfirmationModal = async (itemDelete: any) => {
	await remove(METHOD_HTTP.DELETE, "room", itemDelete.id);
	if (errorRemove.value) return;
	makeData();
	sendCloseModal();
};

const switchRoom = async (item: any) => {
	const status = item.status_room_info.description.toLowerCase();
	const routePath = status === "mantenimiento" ? "enableroom" : "disableroom";
	// console.log(item);
	await swapStatus(METHOD_HTTP.GET, routePath, item.id);
	if (errorDisableRoom.value) return;
	makeData();
};

onMounted(() => {
	makeData();
});

const roomAvailable = () =>
	`<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-toggle-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 9a3 3 0 1 1 -3 3l.005 -.176a3 3 0 0 1 2.995 -2.824" /><path d="M16 5a7 7 0 0 1 0 14h-8a7 7 0 0 1 0 -14zm0 2h-8a5 5 0 1 0 0 10h8a5 5 0 0 0 0 -10" /></svg>`;

const roomDisabled = () =>
	`<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-toggle-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 9a3 3 0 1 1 -3 3l.005 -.176a3 3 0 0 1 2.995 -2.824" /><path d="M16 5a7 7 0 0 1 0 14h-8a7 7 0 0 1 0 -14zm0 2h-8a5 5 0 1 0 0 10h8a5 5 0 0 0 0 -10" /></svg>`;
</script>
<template>
  <CrudLayout
    title="Habitaciones"
    :data="result as any[]"
    :headers="['Número', 'Piso', 'Categoria', 'Precio']"
    :columns="['number', 'flat_name', 'category_name', 'cost']"
    :search="['number', 'flat_name', 'category_name', 'cost']"
    :loading="loading"
    @openModal="handleOpenModal"
    @confirmationModal="handleConfirmationModal"
    ref="crudComponent"
  >
    <template v-slot:actionsRow="{ item }">
      <button class="" @click="switchRoom(item)">
        <div
          class="text-red-700"
          v-html="roomAvailable()"
          v-if="
            item.status_room_info.description.toLowerCase() === 'mantenimiento'
          "
        ></div>
        <div class="text-green-700" v-html="roomDisabled()" v-else></div>
      </button>
    </template>
    <template v-slot:newModal="{ item }">
      <formComponent
        @sumbit="createItem"
        @sendCloseModal="sendCloseModal"
        ref="formComponentRef"
        v-model:number="form.number"
        v-model:cost="form.cost"
        v-model:id_category="form.id_category"
        v-model:id_flat="form.id_flat"
        v-model:id_status_room="form.id_status_room"
        v-model:services="form.servicess"
      />
    </template>

    <template v-slot:editModal="{ item }">
      <formComponent
        @submit="editItem"
        @sendCloseModal="sendCloseModal"
        ref="formComponentRef"
        v-model:number="form.number"
        v-model:cost="form.cost"
        v-model:id_category="form.id_category"
        v-model:id_flat="form.id_flat"
        v-model:id_status_room="form.id_status_room"
        v-model:services="form.servicess"
      />
    </template>
  </CrudLayout>
</template>
