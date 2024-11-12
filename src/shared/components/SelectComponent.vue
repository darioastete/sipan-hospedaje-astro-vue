<script setup lang="ts">
import { useHttp } from "@composables/useHttpUniversal.composable";
import { METHOD_HTTP } from "@type/MethodsHttp.const";
import { onMounted } from "vue";

const { executeRequest: getListAll, loading, result } = useHttp();
// const { data, pathGet } = withDefaults(
//   defineProps<{
//     label: string;
//     data?: any[];
//     optionLabel: string;
//     optionValue: string;
//     hasError?: boolean;
//     pathGet?: string;
//   }>(),
//   {
//     label: "label",
//     optionLabel: "label",
//     optionValue: "value",
//     hasError: false,
//   }
// );

const {
	label = "label",
	data,
	optionLabel = "label",
	optionValue = "value",
	hasError = false,
	pathGet,
} = defineProps<{
	label: string;
	data?: any[];
	optionLabel: string;
	optionValue: string;
	hasError?: boolean;
	pathGet?: string;
}>();

const emit = defineEmits<(e: "updateSelect", item: any) => void>();

const changeEmitted = () => {
	const item = result.value.find(
		(item: any) => item[optionValue] === modelValue.value,
	);
	if (item.name.toLowerCase() === "dni") {
		console.log("esta entrando");
		// return true;
		emit("updateSelect", true);
	} else {
		emit("updateSelect", false);
	}
};

if (pathGet && !data) {
	onMounted(async () => {
		// await getListAll(pathGet);
		await getListAll(METHOD_HTTP.GET, pathGet);
	});
} else {
	result.value = data || [];
}

const modelValue = defineModel();

defineExpose({
	result,
});
</script>
<template>
  <div class="mb-5 mx-2">
    <label
      :for="String(modelValue)"
      class="block sm:mb-2 text-2xs sm:text-xs font-medium uppercase"
    >
      {{ label }}</label
    >
    <select
      :id="String(modelValue)"
      v-model="modelValue"
      @change="changeEmitted"
      :class="`border sm:mb-2 w-full p-2 sm:p-2.5 text-2xs sm:text-xs ${
        hasError
          ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500'
          : ''
      }`"
    >
      <option :value="null || ''" disabled v-if="!loading">
        Seleccione...
      </option>
      <template v-for="item in result" :key="item.id" v-if="!loading">
        <option :value="item[optionValue]" class="uppercase">
          {{ item[optionLabel] }}
        </option>
      </template>
      <template v-else>
        <option :value="null">cargando ...</option>
      </template>
    </select>
  </div>
</template>
