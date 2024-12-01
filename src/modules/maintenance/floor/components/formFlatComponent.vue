<script setup lang="ts">
import Button from "@components/ButtonComponent.vue";
import Input from "@components/InputComponent.vue";

import { useVuelidate } from "@vuelidate/core";
import { email, minLength, required } from "@vuelidate/validators";
import { ref } from "vue";

import { onMounted } from "vue";

const description = defineModel("description");
const number = defineModel("number");

const descriptionInput = ref({ isValid: false });
const numberInput = ref({ isValid: false });

defineEmits(["sumbit", "sendCloseModal"]);

defineExpose({});

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
        ref="descriptionInput"
      />
      <Input
        id="floorMaintenance"
        label="Número"
        type="number"
        v-model="number"
        ref="numberInput"
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
      <Button
        label="Guardar Cambios"
        :disabled="!descriptionInput.isValid || !numberInput.isValid"
      />
    </div>
  </form>
</template>
