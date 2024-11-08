<script setup lang="ts">
import Input from "@components/InputComponent.vue";
import Button from "@components/ButtonComponent.vue";

import { required, helpers, minLength, email } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { ref } from "vue";

import { onMounted } from "vue";

const description = defineModel("description");

const form = ref({
  description,
});

const rules = {
  description: {
    required,
    minLength: minLength(3),
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
    <div class="grid grid-cols-1">
      <Input
        label="Nombre"
        type="text"
        v-model="description"
        :has-error="$form.description.$error"
      />
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
