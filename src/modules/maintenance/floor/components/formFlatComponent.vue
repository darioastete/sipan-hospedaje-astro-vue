<script setup lang="ts">
import Input from "@components/InputComponent.vue";
import Button from "@components/ButtonComponent.vue";

import { required, helpers, minLength, email } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { ref } from "vue";

import { onMounted } from "vue";

const description = defineModel("description");
const number = defineModel("number");

const form = ref({
  description,
  number,
});

const rules = {
  description: {
    required,
    minLength: minLength(3),
    $autoDirty: true,
  },
  number: {
    required,
    $autoDirty: true,
  },
};

const $form = useVuelidate(rules, form);

const clearForm = () => {
  $form.value.$reset();
};

defineExpose({
  $form,
  clearForm,
});

onMounted(async () => {});
</script>
<template>
  <form @submit.prevent="$emit('sumbit')">
    <div class="grid grid-cols-2">
      <Input
        id="floorMaintenance"
        label="Nombre"
        type="text"
        v-model="description"
        :has-error="$form.description.$error"
      />
      <Input
        id="floorMaintenance"
        label="Número"
        type="number"
        v-model="number"
        :has-error="$form.number.$error"
      />
    </div>
    <div class="flex justify-end gap-2">
      <Button
        id="floorMaintenance"
        type="button"
        color="secondary"
        @click="$emit('sendCloseModal')"
        label="Cancelar"
      />
      <Button label="Guardar Cambios" :disabled="$form.$invalid" />
    </div>
  </form>
</template>
