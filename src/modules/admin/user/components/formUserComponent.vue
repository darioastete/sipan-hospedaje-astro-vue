<script setup lang="ts">
import Button from "@components/ButtonComponent.vue";
import Input from "@components/InputComponent.vue";

import { useVuelidate } from "@vuelidate/core";
import {
	email as emailValidator,
	minLength,
	required,
} from "@vuelidate/validators";
import { onMounted, ref } from "vue";

const name = defineModel("name");
const email = defineModel("email");
const password = defineModel("password");

const nameInput = ref({ isValid: false });
const emailInput = ref({ isValid: false });
const passwordInput = ref({ isValid: false });

defineEmits(["sumbit", "sendCloseModal"]);

defineProps<{
	name: string;
	email: string;
	password: string;
}>();

onMounted(async () => {});
defineExpose({});

onMounted(async () => {});
</script>
<template>
  <form @submit.prevent="$emit('sumbit')">
    <div class="grid grid-cols-2">
      <Input
        id="formUserComponent"
        label="Nombres"
        type="text"
        v-model="name"
        ref="nameInput"
      />
      <Input
        id="formUserComponent"
        label="E-mail"
        type="email"
        v-model="email"
        ref="emailInput"
      />
      <Input
        id="formUserComponent"
        label="Contraseña"
        type="password"
        v-model="password"
        ref="passwordInput"
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
        :disabled="
          !nameInput.isValid || !emailInput.isValid || !passwordInput.isValid
        "
      />
    </div>
  </form>
</template>
