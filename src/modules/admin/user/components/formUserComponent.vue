<script setup lang="ts">
import Input from "@components/InputComponent.vue";
import Button from "@components/ButtonComponent.vue";

import {
  required,
  helpers,
  minLength,
  email as emailValidator,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { onMounted, ref } from "vue";
import { onUpdated } from "vue";

const name = defineModel("name");
const email = defineModel("email");
const password = defineModel("password");

defineProps<{
  name: string;
  email: string;
  password: string;
}>();

const form = ref({
  name,
  email,
  password,
});

const rules = {
  name: {
    required,
    minLength: minLength(3),
    $autoDirty: true,
  },
  email: {
    required,
    emailValidator,
    $autoDirty: true,
  },
  password: {
    // required,
    minLength: minLength(6),
    $autoDirty: true,
  },
};

const $form = useVuelidate(rules, form);

const clearForm = () => {
  $form.value.$reset();
};
// onUpdated(() => {
//     $form.value.$reset();
// });

onMounted(async () => {
  $form.value.$reset();
});
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
        id="formUserComponent"
        label="Nombres"
        type="text"
        v-model="name"
        :has-error="$form.name.$error"
      />
      <Input
        id="formUserComponent"
        label="E-mail"
        type="mail"
        v-model="email"
        :has-error="$form.email.$error"
      />
      <Input
        id="formUserComponent"
        label="Contraseña"
        type="password"
        v-model="password"
        :has-error="$form.password.$error"
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
