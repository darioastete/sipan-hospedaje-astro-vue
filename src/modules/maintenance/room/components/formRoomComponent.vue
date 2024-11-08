<script setup lang="ts">
import Input from "@components/InputComponent.vue";
import Select from "@components/SelectComponent.vue";
import Button from "@components/ButtonComponent.vue";
import checkBoxServiceComponent from "@maroom/components/checkBoxServiceComponent.vue";

import { required, decimal } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { ref } from "vue";

import { onMounted } from "vue";

const number = defineModel("number");
const cost = defineModel("cost");
const id_category = defineModel("id_category");
const id_flat = defineModel("id_flat");
const services = defineModel("services", { type: Array, default: [] });

const form = ref({
  number,
  cost,
  id_category,
  id_flat,
  services,
});

const rules = {
  number: {
    required,
    $autoDirty: true,
  },
  cost: {
    required,
    decimal,
    $autoDirty: true,
  },
  id_category: {
    required,
    $autoDirty: true,
  },
  id_flat: {
    required,
    $autoDirty: true,
  },
  services: {
    required,
    $autoDirty: true,
  },
};

const $form = useVuelidate(rules, form);

defineExpose({
  $form,
});

onMounted(async () => {});
</script>
<template>
  <form @submit.prevent="$emit('sumbit')">
    <div class="grid grid-cols-2 mb-5">
      <Input
        id="formRoom"
        label="Número"
        type="text"
        :has-error="$form.number.$error"
        v-model="number"
      />
      <Input
        id="formRoom"
        label="Costo"
        type="text"
        :has-error="$form.cost.$error"
        v-model="cost"
      />

      <Select
        label="Categoria"
        optionLabel="description"
        optionValue="id"
        :has-error="$form.id_category.$error"
        v-model="id_category"
        path-get="category"
      />
      <Select
        label="Piso"
        optionLabel="description"
        optionValue="id"
        :has-error="$form.id_flat.$error"
        v-model="id_flat"
        path-get="flat"
      />
      <checkBoxServiceComponent v-model="services" />
    </div>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        color="secondary"
        @click="$emit('sendCloseModal')"
        label="Cancelar"
      />
      <Button label="Guardar Cambios" :disabled="$form.$invalid" />
    </div>
  </form>
</template>
