<script lang="ts" setup>
// import { useData } from "@composables/getListComposable";
// import { createData } from "@composables/createComposable";
// import { updateData } from "@composables/updateComposable";
// import { deleteData } from "@composables/deleteComposable";
import { useHttp } from "@composables/useHttpUniversal.composable";
import CrudLayout from "@layout/CrudLayout.vue";
import formClientComponent from "@maintenance/client/components/formClientComponent.vue";
import type { Datum } from "@maintenance/client/types/clientAllResponse";
import { METHOD_HTTP } from "@type/MethodsHttp.const";
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

const initialFormClient = {
	id: "",
	document: "",
	last_name: "",
	name: "",
	id_document_type: "",
	status: null,
};

const formClient = ref<Datum>(initialFormClient);

const handleOpenModal = (item: any) => {
	if (item !== null) {
		const newitem = { ...item };
		formClient.value = newitem;
	} else {
		resetForm();
	}
};

const formClientComponentRef = ref({
	clearForm: () => {},
});
const resetForm = () => {
	formClient.value = { ...initialFormClient };
	formClientComponentRef.value.clearForm();
};

const sendCloseModal = () => {
	crudComponent.value.closeModal();
};

const makeData = async () => {
	await getListAll(METHOD_HTTP.GET, "client");
};

const createClient = async () => {
	// console.log("esta haciendo el create client?");
	await create(METHOD_HTTP.POST, "client", undefined, formClient.value);
	if (errorCreate.value) return;
	sendCloseModal();
	makeData();
	resetForm();
};

const editClient = async () => {
	await update(
		METHOD_HTTP.PUT,
		"client",
		formClient.value.id,
		formClient.value,
	);
	if (errorUpdate.value) return;
	sendCloseModal();
	makeData();
	resetForm();
};

const handleConfirmationModal = async (itemDelete: any) => {
	await remove("client", itemDelete.id);
	if (errorRemove.value) return;
	makeData();
	sendCloseModal();
};

makeData();
</script>
<template>
  <CrudLayout
    title="Clientes"
    :data="result"
    :headers="['Nombre', 'Apellidos', 'N° Doc']"
    :columns="['name', 'last_name', 'document']"
    :search="['name', 'document', 'last_name']"
    :loading="loading"
    @openModal="handleOpenModal"
    @confirmationModal="handleConfirmationModal"
    ref="crudComponent"
  >
    <template v-slot:actionsRow="{ item }" />
    <template v-slot:newModal="{ item }">
      <formClientComponent
        @submit="createClient"
        @sendCloseModal="sendCloseModal"
        ref="formClientComponentRef"
        v-model:name="formClient.name"
        v-model:last_name="formClient.last_name"
        v-model:id_document_type="formClient.id_document_type"
        v-model:document="formClient.document"
      />
    </template>

    <template v-slot:editModal="{ item }">
      <formClientComponent
        @submit="editClient"
        @sendCloseModal="sendCloseModal"
        ref="formClientComponentRef"
        v-model:name="formClient.name"
        v-model:last_name="formClient.last_name"
        v-model:id_document_type="formClient.id_document_type"
        v-model:document="formClient.document"
      />
    </template>
  </CrudLayout>
</template>
