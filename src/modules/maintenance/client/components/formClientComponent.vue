<script setup lang="ts">
import Button from "@components/ButtonComponent.vue";
import Input from "@components/InputComponent.vue";
import Select from "@components/SelectComponent.vue";

import { useVuelidate } from "@vuelidate/core";
import { email, minLength, required } from "@vuelidate/validators";
import { ref, watch } from "vue";
// import { useFindData } from "@composables/findComposable";

import { useHttp } from "@composables/useHttpDNI.composable";
// import { METHOD_HTTP } from "@type/MethodsHttp.const";

const name = defineModel("name", { type: String, default: "" });
const last_name = defineModel("last_name", { type: String, default: "" });
const id_document_type = defineModel("id_document_type", {
	type: String,
	default: "",
});
const document = defineModel("document", { type: String, default: "" });
const cell_phone = defineModel("cell_phone", {
	type: String,
	default: "923456788",
});
const mail = defineModel("mail", {
	type: String,
	default: "default@gmail.com",
});
const ocupation = defineModel("ocupation", {
	type: String,
	default: "DEFAULT",
});

const form = ref({
	id: null,
	name,
	last_name,
	id_document_type,
	document,
	cell_phone,
	mail,
	ocupation,
});

const clearForm = () => {
	form.value.id = null;
	form.value.name = "";
	form.value.last_name = "";
	form.value.id_document_type = "";
	form.value.document = "";
	form.value.cell_phone = "923456788";
	form.value.mail = "default@gmail.com";
	form.value.ocupation = "DEFAULT";
	// $form.value.$reset();
};

watch(
	() => form.value.id_document_type,
	(value) => {
		console.log(value);
		// if (value) {
		//   form.value.document = "";
		// }
	},
);

withDefaults(
	defineProps<{
		disabled?: boolean;
		createButton?: boolean;
		listTypeDoc?: any[];
	}>(),
	{
		disabled: false,
		createButton: true,
	},
);
const search = ref(false);

const {
	executeRequest: find,
	error: errorFind,
	loading: loadingFind,
	result: resultFind,
} = useHttp();

// const rules = {
//   name: {
//     required,
//     minLength: minLength(3),
//     $autoDirty: true,
//   },
//   last_name: {
//     required,
//     minLength: minLength(3),
//     $autoDirty: true,
//   },
//   id_document_type: {
//     required,
//     minLength: minLength(3),
//     $autoDirty: true,
//   },
//   document: {
//     required,
//     minLength: minLength(3),
//     $autoDirty: true,
//   },
//   cell_phone: {
//     required,
//     minLength: minLength(3),
//     $autoDirty: true,
//   },
//   mail: {
//     required,
//     minLength: minLength(3),
//     email,
//     $autoDirty: true,
//   },
//   ocupation: {
//     required,
//     minLength: minLength(3),
//     $autoDirty: true,
//   },
// };

const emit = defineEmits<{
	(e: "findClient", id: string): void;
	(e: "submit"): void;
	(e: "sendCloseModal"): void;
}>();
const searchClient = async () => {
	if (!form.value.id_document_type || !form.value.document) {
		return alert("Especifica el tipo y número de documento");
	}
	await find(form.value.document);
	if (errorFind.value) {
		return;
	}

	console.log("RESULT FUND", resultFind.value);
	form.value.name = resultFind.value.data.NOMBRES;
	form.value.last_name = `${resultFind.value.data.AP_PAT}·${resultFind.value.data.AP_MAT}`;
	form.value.cell_phone = "923456788";
	form.value.mail = "default@gmail.com";
	form.value.ocupation = "DEFAULT";
	// form.value = resultFind.value;
	emit("findClient", resultFind.value.id);
};

const updateSelect = (value: any) => {
	console.log("value", value);
	if (value) {
		search.value = true;
	} else {
		search.value = false;
	}
	// value ? (search.value = true) : (search.value = false);
};

// const $form = useVuelidate(rules, form);

const onSubmit = () => {
	emit("submit");
};
const sendCloseModal = () => {
	emit("sendCloseModal");
};

defineExpose({
	clearForm,
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
        @updateSelect="updateSelect"
        :data="listTypeDoc"
      />
      <Input
        id="clientMaintenance"
        label="N° Documento"
        type="text"
        v-model="form.document"
        :search="search"
        @searchClick="searchClient"
      />

      <Input
        id="clientMaintenance"
        label="nombres"
        type="text"
        v-model="form.name"
        :disabled="disabled"
      />
      <Input
        id="clientMaintenance"
        label="Apellidos"
        type="text"
        :disabled="disabled"
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
