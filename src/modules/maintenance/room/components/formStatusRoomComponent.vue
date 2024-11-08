<script setup lang="ts">
import Button from "@components/ButtonComponent.vue";
import Input from "@components/InputComponent.vue";

import { useVuelidate } from "@vuelidate/core";
import { email, minLength, required } from "@vuelidate/validators";
import { ref } from "vue";

import { onMounted } from "vue";

const description = defineModel("description");
const color = defineModel("color");

const form = ref({
	description,
	color,
});

const rules = {
	description: {
		required,
		minLength: minLength(3),
		$autoDirty: true,
	},
	color: {
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
        id="maintenanceStatusRoom"
        label="Nombre"
        type="text"
        v-model="description"
        :has-error="$form.description.$error"
      />
      <Input
        id="maintenanceStatusRoom"
        label="Color"
        type="color"
        v-model="color"
        :has-error="$form.color.$error"
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
