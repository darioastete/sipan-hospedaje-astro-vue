<script setup lang="ts">
import { auth } from "@auth/services/auth.service";
import Button from "@components/ButtonComponent.vue";
import Input from "@components/InputComponent.vue";

import { ref } from "vue";

const form = ref({
	email: "",
	password: "",
});

const login = async () => {
	const response = await auth(form.value);
	localStorage.setItem("token", String(response.data));
	window.location.href = "/";
};
</script>
<template>
  <form class="flex flex-col" @submit.prevent="login" novalidate>
    <Input
      label="Usuario"
      type="email"
      class="w-60 sm:w-60 shadow-lg"
      v-model="form.email"
      id="login"
      :novalidate="true"
    />
    <Input
      label="Contraseña"
      type="password"
      class="w-60 sm:w-60 shadow-lg"
      v-model="form.password"
      id="login"
      :novalidate="true"
    />
    <Button label="Ingresar" class="shadow-lg" />
  </form>
</template>
