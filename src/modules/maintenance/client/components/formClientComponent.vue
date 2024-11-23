<script setup lang="ts">
import Button from "@components/ButtonComponent.vue";
import Input from "@components/InputComponent.vue";
import Select from "@components/SelectComponent.vue";

// import { useVuelidate } from "@vuelidate/core";
// import { email, minLength, required } from "@vuelidate/validators";
import { ref, watch } from "vue";
// import { useFindData } from "@composables/findComposable";

// import { useHttpDNI } from "@composables/useHttpDNI.composable";
import { useHttp } from "@composables/useHttpUniversal.composable";
import { METHOD_HTTP } from "@type/MethodsHttp.const";

// const {
//   executeRequest: findDNI,
//   error: errorFindDNI,
//   loading: loadingFindDNI,
//   result: resultFindDNI,
// } = useHttpDNI();

const {
	executeRequest: findClient,
	error: errorFindClient,
	loading: loadingFindClient,
	result: resultFindClient,
} = useHttp();

const name = defineModel("name", { type: String, default: "" });
const last_name = defineModel("last_name", { type: String, default: "" });
const id_document_type = defineModel("id_document_type", {
	type: String,
	default: "",
});
const document = defineModel("document", { type: String, default: "" });
const form = ref({
	id: null,
	name,
	last_name,
	id_document_type,
	document,
});

const clearForm = () => {
	form.value.id = null;
	form.value.name = "";
	form.value.last_name = "";
	form.value.id_document_type = "";
	form.value.document = "";
	// $form.value.$reset();
};

const { listTypeDoc } = withDefaults(
	defineProps<{
		search?: boolean;
		disabled?: boolean;
		createButton?: boolean;
		listTypeDoc?: any[];
	}>(),
	{
		disabled: false,
		createButton: true,
	},
);

interface ResultDocumentItem {
	id: string;
	name: string;
	status: number;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
}

interface ApiDocumentResponse {
	result: ResultDocumentItem[];
}
const defaultResultDocumentItem: ResultDocumentItem = {
	id: "",
	name: "",
	status: 0,
	created_at: "",
	updated_at: "",
	deleted_at: null,
};

const search = ref(true);
const typeOfDocument = ref("");
const inputFindRef = ref<ApiDocumentResponse>({
	result: [defaultResultDocumentItem],
});

const emit = defineEmits<{
	(e: "findClient", id: string): void;
	(e: "submit"): void;
	(e: "sendCloseModal"): void;
}>();
const searchDNIClient = async () => {
	if (!form.value.id_document_type || !form.value.document) {
		return alert("Especifica el tipo y número de documento");
	}

	//   if (typeOfDocument.value === "dni") {
	//     await findDNI(form.value.document);
	//     if (errorFindDNI.value) return;
	//     form.value.name = resultFindDNI.value.data.NOMBRES;
	//     form.value.last_name = `${resultFindDNI.value.data.AP_PAT} ${resultFindDNI.value.data.AP_MAT}`;
	//   }
	//   if (typeOfDocument.value === "pasaporte") {
	findClient(
		METHOD_HTTP.GET,
		`clientbydni/${form.value.id_document_type}/${form.value.document}`,
	);

	if (errorFindClient.value) return;

	//   return alert("No se puede buscar por RUC");
	//   }

	// form.value = resultFindDNI.value;
	//   emit("findClient", resultFindDNI.value.id);
};

watch(resultFindClient, (newValue) => {
	if (!newValue) {
		search.value = false;
		return;
	}
	form.value.id = newValue.id;
	form.value.name = newValue.name;
	form.value.last_name = newValue.last_name;
	form.value.document = newValue.document;
});

watch(
	() => form.value.document,
	(value) => {
		search.value = true;
		form.value.id = null;
		form.value.name = "";
		form.value.last_name = "";
	},
);
// watch(
//   () => form.value.id_document_type,
//   (value) => {
//     const item = inputFindRef.value.result.find(
//       (item: ResultDocumentItem) => item.id === form.value.id_document_type
//     );
//     if (!item) return;
//     typeOfDocument.value = item.name.toLowerCase();
//     // search.value = item ? item.name.toLowerCase() === "dni" : false;
//     form.value.id = null;
//     form.value.name = defaultResultDocumentItem.name;
//     form.value.last_name = "";
//     form.value.document = "";
//   }
// );

const onSubmit = () => {
	emit("submit");
};
const sendCloseModal = () => {
	emit("sendCloseModal");
};

defineExpose({
	clearForm,
	form: form.value,
});
</script>
<template>
  <form @submit.prevent="onSubmit">
    <div class="grid grid-cols-2">
      <Select
        label="Documento"
        optionLabel="name"
        optionValue="id"
        v-model="form.id_document_type"
        path-get="documentype"
        :data="listTypeDoc"
        ref="inputFindRef"
      />
      <Input
        id="clientMaintenance"
        label="N° Documento"
        type="text"
        v-model="form.document"
        :search="search"
        @searchClick="searchDNIClient"
        :disabled="disabled || form.id_document_type === ''"
      />

      <!-- <Input
        id="clientMaintenance"
        label="nombres"
        type="text"
        v-model="form.name"
      /> -->
      <Input
        id="clientMaintenance"
        label="nombres"
        type="text"
        v-model="form.name"
        :disabled="disabled || search || form.id_document_type === ''"
      />
      <!-- <Input
        id="clientMaintenance"
        label="Apellidos"
        type="text"
        v-model="form.last_name"
      /> -->
      <Input
        id="clientMaintenance"
        label="Apellidos"
        type="text"
        :disabled="disabled || search || form.id_document_type === ''"
        v-model="form.last_name"
      />

      <!-- <Input
        id="clientMaintenance"
        label="Teléfono"
        type="text"
        :disabled="disabled"
        v-model="form.cell_phone"
      />
      <Input
        id="clientMaintenance"
        label="correo"
        type="text"
        :disabled="disabled"
        v-model="form.mail"
      />
      <Input
        id="clientMaintenance"
        label="Ocupación"
        type="text"
        :disabled="disabled"
        v-model="form.ocupation"
      /> -->
    </div>
    <div class="flex justify-end gap-2" v-if="createButton">
      <Button
        type="button"
        color="secondary"
        @click="sendCloseModal"
        label="Cancelar"
      />
      <Button label="Guardar Cambios" />
    </div>
  </form>
</template>
