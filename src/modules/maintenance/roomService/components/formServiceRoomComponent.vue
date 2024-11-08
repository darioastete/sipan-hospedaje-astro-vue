<script setup lang="ts">
import Input from "@components/InputComponent.vue";
import Button from "@components/ButtonComponent.vue";

import { required, helpers, minLength, email } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { ref } from "vue";

import { onMounted } from "vue";

const name = defineModel("name");

const form = ref({
  name,
});

const rules = {
  name: {
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
        id="maintenanceRoomService"
        label="Nombre"
        type="text"
        v-model="name"
        :has-error="$form.name.$error"
      />
    </div>
    <div class="flex justify-end gap-1">
      <Button
        id="maintenanceRoomService"
        type="button"
        color="secondary"
        @click="$emit('sendCloseModal')"
        label="Cancelar"
      />
      <Button label="Guardar Cambios" :disabled="$form.$invalid" />
    </div>
  </form>
</template>
