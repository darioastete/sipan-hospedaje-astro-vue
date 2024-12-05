<script setup lang="ts">
import ButtonComponent from "@components/ButtonComponent.vue";
import InputComponent from "@components/InputComponent.vue";
import { useHttp } from "@composables/useHttpUniversal.composable";
import { METHOD_HTTP } from "@type/MethodsHttp.const";
import { computed, onMounted, ref } from "vue";

// import { useVuelidate } from "@vuelidate/core";
// import { email, minLength, required } from "@vuelidate/validators";

const { executeRequest: getReport, loading, result, error } = useHttp();

const form = ref({
	from: "",
	to: "",
});

const { path } = defineProps<{
	path: string;
	title: string;
}>();

const getReportForComposable = async () => {
	await getReport(METHOD_HTTP.POST, path, undefined, form.value);
	if (error.value) return;
	console.log(result.value);
};

// Método para validar las fechas
const validDates = computed((): boolean => {
	const fromDate = form.value.from ? new Date(form.value.from) : null;
	const toDate = form.value.to ? new Date(form.value.to) : null;

	if (fromDate && toDate) {
		if (toDate < fromDate) {
			form.value.to = ""; // Limpiar el campo "Hasta" si es inválido
			return false;
		}
		return true;
	}
	return false;
});

onMounted(async () => {
	await getReportForComposable();
});
</script>
<template>
  <div class="py-5 px-5">
    <!-- <h2 class="text-xl font-semibold mb-5 mt-5">{{ title }}</h2> -->
    <form @submit.prevent="getReportForComposable" class="mb-5">
      <div class="flex flex-col sm:flex-row items-center justify-around">
        <div class="flex items-center justify-center">
          <InputComponent
            id="report-from"
            label="Desde"
            type="datetime-local"
            v-model="form.from"
          />
          <InputComponent
            id="report-from"
            label="Hasta"
            type="datetime-local"
            v-model="form.to"
          />
        </div>
        <ButtonComponent
          label="Buscar"
          :disabled="!form.from || !form.to || !validDates"
        />
      </div>
    </form>
    <div class="px-2 py-2 bg-white rounded-lg">
      <template v-if="!loading">
        <table v-if="result.length > 0" class="w-full">
          <thead class="shadow-md">
            <tr>
              <th class="text-2xs sm:text-xs py-3">N°</th>
              <th v-for="[key, value] in Object.entries(result[0])">
                <span class="uppercase text-2xs sm:text-xs py-3">{{
                  key.toString().replace(/_/g, " ")
                }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in result">
              <td class="text-center text-2xs sm:text-xs border-b-2 py-3">
                {{ index + 1 }}
              </td>
              <td
                v-for="[key, value] in Object.entries(item)"
                :class="`text-2xs sm:text-xs lowercase sm:uppercase border-b-2 py-3 ${
                  key != 'cliente' ? 'text-center' : 'text-left'
                }`"
              >
                {{ item[key] }}
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="flex justify-center items-center py-5">
          <p class="text-2xs sm:text-xs">No hay registros</p>
        </div>
      </template>
      <template v-else>
        <div class="flex justify-center items-center py-5">
          <p class="text-2xs sm:text-xs">Cargando...</p>
        </div>
      </template>
    </div>
  </div>
</template>
