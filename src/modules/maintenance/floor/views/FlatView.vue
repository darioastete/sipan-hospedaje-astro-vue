<script lang="ts" setup>
import { useHttp } from "@composables/useHttpUniversal.composable";
import CrudLayout from "@layout/CrudLayout.vue";
import formComponent from "@maintenance/floor/components/formFlatComponent.vue";
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
	number: "",
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
	formComponentRef.value.clearForm();
};

const sendCloseModal = () => {
	crudComponent.value.closeModal();
};

const makeData = async () => {
	await getListAll(METHOD_HTTP.GET, "flat");
};

const createItem = async () => {
	await create(METHOD_HTTP.POST, "flat", undefined, form.value);
	if (errorCreate.value) return;
	sendCloseModal();
	makeData();
	resetForm();
};

const editItem = async () => {
	await update(METHOD_HTTP.PUT, "flat", form.value.id, form.value);
	if (errorUpdate.value) return;
	sendCloseModal();
	makeData();
	resetForm();
};

const handleConfirmationModal = async (itemDelete: any) => {
	await remove("flat", itemDelete.id);
	if (errorRemove.value) return;
	makeData();
	sendCloseModal();
};

makeData();
</script>
<template>
  <CrudLayout
    title="Pisos"
    :data="result"
    :headers="['Nombre', 'Numero']"
    :columns="['description', 'number']"
    :search="['description', 'number']"
    :loading="loading"
    @openModal="handleOpenModal"
    @confirmationModal="handleConfirmationModal"
    ref="crudComponent"
  >
    <template v-slot:actionsRow="{ item }" />
    <template v-slot:newModal="{ item }">
      <formComponent
        @sumbit="createItem"
        @sendCloseModal="sendCloseModal"
        ref="formComponentRef"
        v-model:description="form.description"
        v-model:number="form.number"
      />
    </template>

    <template v-slot:editModal="{ item }">
      <formComponent
        @submit="editItem"
        @sendCloseModal="sendCloseModal"
        ref="formComponentRef"
        v-model:description="form.description"
        v-model:number="form.number"
      />
    </template>
  </CrudLayout>
</template>
