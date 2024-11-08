<script setup lang="ts">
import Checkbox from "@components/CheckboxComponent.vue";
import { useHttp } from "@composables/useHttpUniversal.composable";
import { METHOD_HTTP } from "@type/MethodsHttp.const";
import { onMounted } from "vue";

const { executeRequest: getListAll, result } = useHttp();

onMounted(async () => {
	await getListAll(METHOD_HTTP.GET, "service");
});

const modelValue = defineModel({ type: Array, default: [] });
</script>
<template>
  <template v-for="service in result">
    <Checkbox
      :id="service.id"
      :label="service.name"
      :value="service.id"
      v-model="modelValue"
    />
  </template>
</template>
