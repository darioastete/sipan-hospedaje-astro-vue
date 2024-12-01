<script lang="ts" setup>
import { useHttp } from "@composables/useHttpUniversal.composable";
import CrudLayout from "@layout/CrudLayout.vue";
import formComponent from "@maroom/components/formStatusRoomComponent.vue";
import { METHOD_HTTP } from "@type/MethodsHttp.const";
import type { SimpleCrud } from "@type/simple.crud";
import { ref } from "vue";

const { executeRequest: getListAll, result, loading } = useHttp();
const { executeRequest: create, error: errorCreate } = useHttp();
const {
	executeRequest: update,
	error: errorUpdate,
	loading: loadingUpdate,
} = useHttp();
const {
	executeRequest: remove,
	error: errorRemove,
	loading: loadingRemove,
} = useHttp();
const crudComponent = ref();

const initialForm = {
	id: "",
	description: "",
	color: "",
};

const form = ref<SimpleCrud>(initialForm);

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
};

const sendCloseModal = () => {
	crudComponent.value.closeModal();
};

const makeData = async () => {
	await getListAll(METHOD_HTTP.GET, "statusroom");
};

const createItem = async () => {
	await create(METHOD_HTTP.POST, "statusroom", undefined, form.value);
	if (errorCreate.value) return;
	sendCloseModal();
	makeData();
	resetForm();
};

const editItem = async () => {
	await update(METHOD_HTTP.PUT, "statusroom", form.value.id, form.value);
	if (errorUpdate.value) return;
	sendCloseModal();
	makeData();
	resetForm();
};

const handleConfirmationModal = async (itemDelete: any) => {
	await remove(METHOD_HTTP.DELETE, "statusroom", itemDelete.id);
	if (errorRemove.value) return;
	makeData();
	sendCloseModal();
};

makeData();
</script>
<template>
  <CrudLayout
    title="Estado de Habitacion"
    :data="result"
    :headers="['Nombre', 'Color']"
    :columns="['description', 'color']"
    :search="['description', 'color']"
    :loading="loading"
    @openModal="handleOpenModal"
    @confirmationModal="handleConfirmationModal"
    ref="crudComponent"
  >
    <template v-slot:additional="{ item }">
      <div v-if="item.col === 'description'">
        {{ item.row.description }}
      </div>
      <div :style="`height: 20px; background-color: ${item.row.color}`" v-else>
        <!-- {{ item.row.color }} -->
      </div>
    </template>
    <template v-slot:actionsRow="{ item }"> </template>
    <template v-slot:newModal="{ item }">
      <formComponent
        @sumbit="createItem"
        @sendCloseModal="sendCloseModal"
        ref="formComponentRef"
        v-model:description="form.description"
        v-model:color="form.color"
      />
    </template>

    <template v-slot:editModal="{ item }">
      <formComponent
        @submit="editItem"
        @sendCloseModal="sendCloseModal"
        ref="formComponentRef"
        v-model:description="form.description"
        v-model:color="form.color"
      />
    </template>
  </CrudLayout>
</template>
