<script setup lang="ts">
import Button from "@components/ButtonComponent.vue";
import Input from "@components/InputComponent.vue";
import { onMounted, ref } from "vue";

const description = defineModel("description");
const color = defineModel("color");

const descriptionInputRef = ref<{ isValid: boolean }>({ isValid: false });
const colorInputRef = ref({ isValid: false });

defineEmits(["sumbit", "sendCloseModal"]);

defineExpose({});

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
        ref="descriptionInputRef"
      />
      <Input
        id="maintenanceStatusRoom"
        label="Color"
        type="color"
        v-model="color"
        ref="colorInputRef"
      />
    </div>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        color="secondary"
        @click="$emit('sendCloseModal')"
        label="Cancelar"
      />
      <Button
        label="Guardar Cambios"
        :disabled="!descriptionInputRef?.isValid || !colorInputRef?.isValid"
      />
    </div>
  </form>
</template>
