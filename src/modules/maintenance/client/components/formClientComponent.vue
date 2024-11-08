<script setup lang="ts">
import Input from "@components/InputComponent.vue";
import Select from "@components/SelectComponent.vue";
import Button from "@components/ButtonComponent.vue";

import { required, helpers, minLength, email } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { ref } from "vue";
// import { useFindData } from "@composables/findComposable";

import { useHttp } from "@composables/useHttpUniversal.composable";
import { METHOD_HTTP } from "@type/MethodsHttp.const";

const name = defineModel("name", { type: String, default: "" });
const last_name = defineModel("last_name", { type: String, default: "" });
const id_document_type = defineModel("id_document_type", {
  type: String,
  default: "",
});
const document = defineModel("document", { type: String, default: "" });
const cell_phone = defineModel("cell_phone", { type: String, default: "" });
const mail = defineModel("mail", { type: String, default: "" });
const ocupation = defineModel("ocupation", { type: String, default: "" });

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
  form.value.cell_phone = "";
  form.value.mail = "";
  form.value.ocupation = "";
  $form.value.$reset();
};

withDefaults(
  defineProps<{
    disabled?: boolean;
    createButton?: boolean;
    search?: boolean;
    listTypeDoc?: any[];
  }>(),
  {
    disabled: false,
    createButton: true,
    search: false,
  }
);

const {
  executeRequest: find,
  error: errorFind,
  loading: loadingFind,
  result: resultFind,
} = useHttp();

const rules = {
  name: {
    required,
    minLength: minLength(3),
    $autoDirty: true,
  },
  last_name: {
    required,
    minLength: minLength(3),
    $autoDirty: true,
  },
  id_document_type: {
    required,
    minLength: minLength(3),
    $autoDirty: true,
  },
  document: {
    required,
    minLength: minLength(3),
    $autoDirty: true,
  },
  cell_phone: {
    required,
    minLength: minLength(3),
    $autoDirty: true,
  },
  mail: {
    required,
    minLength: minLength(3),
    email,
    $autoDirty: true,
  },
  ocupation: {
    required,
    minLength: minLength(3),
    $autoDirty: true,
  },
};

const emit = defineEmits<{
  (e: "findClient", id: string): void;
  (e: "submit"): void;
  (e: "sendCloseModal"): void;
}>();
const searchClient = async () => {
  if (!form.value.id_document_type || !form.value.document) {
    return alert("Especifica el tipo y número de documento");
  }
  await find(
    METHOD_HTTP.GET,
    "clientbydni",
    `${form.value.id_document_type}/${form.value.document}`
  );
  if (errorFind.value) {
    return;
  }
  form.value = resultFind.value;
  console.log(form.value, resultFind.value);
  emit("findClient", resultFind.value.id);
};

const $form = useVuelidate(rules, form);

const onSubmit = () => {
  emit("submit");
};
const sendCloseModal = () => {
  emit("sendCloseModal");
};

defineExpose({
  $form,
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
        :has-error="$form.id_document_type.$error"
        v-model="form.id_document_type"
        path-get="documentype"
        :data="listTypeDoc"
      />
      <Input
        id="clientMaintenance"
        label="N° Documento"
        type="text"
        :has-error="$form.document.$error"
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
        :has-error="$form.name.$error"
      />
      <Input
        id="clientMaintenance"
        label="Apellidos"
        type="text"
        :disabled="disabled"
        :has-error="$form.last_name.$error"
        v-model="form.last_name"
      />

      <Input
        id="clientMaintenance"
        label="Teléfono"
        type="text"
        :disabled="disabled"
        :has-error="$form.cell_phone.$error"
        v-model="form.cell_phone"
      />
      <Input
        id="clientMaintenance"
        label="correo"
        type="text"
        :disabled="disabled"
        :has-error="$form.mail.$error"
        v-model="form.mail"
      />
      <Input
        id="clientMaintenance"
        label="Ocupación"
        type="text"
        :disabled="disabled"
        :has-error="$form.ocupation.$error"
        v-model="form.ocupation"
      />
    </div>
    <div class="flex justify-end gap-2" v-if="createButton">
      <Button
        type="button"
        color="secondary"
        @click="sendCloseModal"
        label="Cancelar"
      />
      <Button label="Guardar Cambios" :disabled="$form.$invalid" />
    </div>
  </form>
</template>
