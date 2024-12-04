<script setup lang="ts">
import Button from "@components/ButtonComponent.vue";
import Input from "@components/InputComponent.vue";
import Select from "@components/SelectComponent.vue";

import { computed, ref, watch } from "vue";

import { useHttp } from "@composables/useHttpUniversal.composable";
import { METHOD_HTTP } from "@type/MethodsHttp.const";

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

const nroDocInput = ref({ isValid: false });
const namesInput = ref({ isValid: false });
const lastNamesInput = ref({ isValid: false });

const clearForm = () => {
	form.value.id = null;
	form.value.name = "";
	form.value.last_name = "";
	form.value.id_document_type = "";
	form.value.document = "";
};

const { documentInfo, mode, disabled } = withDefaults(
	defineProps<{
		search?: boolean;
		mode?: string;
		disabled?: boolean;
		createButton?: boolean;
		listTypeDoc?: any[];
		documentInfo?: any;
	}>(),
	{
		disabled: false,
		createButton: true,
		mode: "default",
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
const typeOfDocument = ref();
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
	findClient(
		METHOD_HTTP.GET,
		`clientbydni/${form.value.id_document_type}/${form.value.document}`,
	);

	if (errorFindClient.value) return;
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
		console.log(value, "que es esto?");
		search.value = true;
		form.value.id = null;
		form.value.name = "";
		form.value.last_name = "";
	},
);

watch(
	() => form.value.id_document_type,
	(value) => {
		const item = inputFindRef.value.result.find(
			(item: ResultDocumentItem) => item.id === form.value.id_document_type,
		);
		if (!item) return;

		typeOfDocument.value = item.name.toLowerCase();
		form.value.document = "";
	},
);

const onSubmit = () => {
	emit("submit");
};
const sendCloseModal = () => {
	emit("sendCloseModal");
};

if (documentInfo) {
	typeOfDocument.value = documentInfo.name.toLowerCase();
	console.log(typeOfDocument.value);
}

const isEditable = computed(() => {
	if (mode === "edit") {
		return true; // Siempre editable en modo "edit"
	}
	return !(disabled || search.value || form.value.id_document_type === "");
});

const isValid = computed(() => {
	return (
		nroDocInput.value.isValid &&
		namesInput.value.isValid &&
		lastNamesInput.value.isValid
	);
});

defineExpose({
	clearForm,
	form: form.value,
	isValid,
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
        :disabled="mode === 'edit'"
      />
      <Input
        id="clientMaintenance"
        label="N° Documento"
        :type="typeOfDocument"
        v-model="form.document"
        :search="search && mode !== 'edit'"
        @searchClick="searchDNIClient"
        :disabled="disabled || form.id_document_type === '' || mode === 'edit'"
        ref="nroDocInput"
      />

      <Input
        id="clientMaintenance"
        label="nombres"
        type="text"
        v-model="form.name"
        :disabled="!isEditable"
        ref="namesInput"
      />

      <Input
        id="clientMaintenance"
        label="Apellidos"
        type="text"
        :disabled="!isEditable"
        v-model="form.last_name"
        ref="lastNamesInput"
      />
    </div>
    <div class="flex justify-end gap-2" v-if="createButton">
      <Button
        type="button"
        color="secondary"
        @click="sendCloseModal"
        label="Cancelar"
      />
      <Button :label="`Guardar Cambios`" :disabled="!isValid" />
    </div>
  </form>
</template>
