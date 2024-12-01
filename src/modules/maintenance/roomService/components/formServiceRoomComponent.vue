<script setup lang="ts">
import Button from "@components/ButtonComponent.vue";
import Input from "@components/InputComponent.vue";

import { onMounted, ref } from "vue";

import {} from "vue";

const name = defineModel("name");
const nameInput = ref({ isValid: false });
defineEmits(["sumbit", "sendCloseModal"]);

const form = ref({
	name,
});

defineExpose({});
</script>
<template>
  <form @submit.prevent="$emit('sumbit')">
    <div class="grid grid-cols-1">
      <Input
        id="maintenanceRoomService"
        label="Nombre"
        type="text"
        v-model="name"
        ref="nameInput"
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
      <Button label="Guardar Cambios" :disabled="!nameInput.isValid" />
    </div>
  </form>
</template>
