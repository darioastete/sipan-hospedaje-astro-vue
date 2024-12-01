<script setup lang="ts">
import Button from "@components/ButtonComponent.vue";
import Input from "@components/InputComponent.vue";

import { useVuelidate } from "@vuelidate/core";
// import { email, minLength, required } from "@vuelidate/validators";
import { ref } from "vue";

import { onMounted } from "vue";

const description = defineModel("description");
defineEmits(["sumbit", "sendCloseModal"]);

const descriptionInput = ref({ isValid: false });

defineExpose({});

onMounted(async () => {});
</script>
<template>
  <form @submit.prevent="$emit('sumbit')">
    <div class="grid grid-cols-1">
      <Input
        id="description"
        label="Nombre"
        type="text"
        v-model="description"
        ref="descriptionInput"
      />
    </div>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        color="secondary"
        @click="$emit('sendCloseModal')"
        label="Cancelar"
      />
      <Button label="Guardar Cambios" :disabled="!descriptionInput.isValid" />
    </div>
  </form>
</template>
