<script setup lang="ts">
import Button from "@components/ButtonComponent.vue";
import Input from "@components/InputComponent.vue";
import Select from "@components/SelectComponent.vue";
import checkBoxServiceComponent from "@maroom/components/checkBoxServiceComponent.vue";

import { computed, ref } from "vue";

import { onMounted } from "vue";

const number = defineModel("number");
const cost = defineModel("cost");
const id_category = defineModel("id_category");
const id_flat = defineModel("id_flat");
const services = defineModel("services", { type: Array, default: [] });

defineEmits(["sumbit", "sendCloseModal"]);

const numberInput = ref({ isValid: false });
const costInput = ref({ isValid: false });

defineExpose({});

const validForm = computed(() => {
	const rules = [
		numberInput.value?.isValid, // Validación del número
		costInput.value?.isValid, // Validación del costo
		Boolean(id_category.value), // La categoría debe ser válida
		Boolean(id_flat.value), // La identificación del flat debe ser válida
		services.value.length > 0, // Debe haber al menos un servicio seleccionado
	];

	// Verifica si todas las reglas son verdaderas
	return rules.every((rule) => rule);
});

onMounted(async () => {});
</script>
<template>
  <form @submit.prevent="$emit('sumbit')">
    <div class="grid grid-cols-2 mb-5">
      <Input
        id="formRoom"
        label="Número"
        type="number"
        v-model="number"
        ref="numberInput"
      />
      <Input
        id="formRoom"
        label="Costo"
        type="money"
        v-model="cost"
        ref="costInput"
      />

      <Select
        label="Categoria"
        optionLabel="description"
        optionValue="id"
        v-model="id_category"
        path-get="category"
      />
      <Select
        label="Piso"
        optionLabel="description"
        optionValue="id"
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
      <Button label="Guardar Cambios" :disabled="!validForm" />
    </div>
  </form>
</template>
