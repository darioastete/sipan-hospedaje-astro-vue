<script lang="ts" setup>
import { useHttp } from "@composables/useHttpUniversal.composable";
import { METHOD_HTTP } from "@type/MethodsHttp.const";
import { computed, onMounted } from "vue";

const { executeRequest: getAll, result: allData, loading } = useHttp();

const { staySel } = defineProps<{
	staySel: string;
}>();

enum typePay {
	latefee = "Mora",
	service = "Servicio",
	damage = "Daños",
	stay = "Estadía",
}

onMounted(async () => {
	await getAll(METHOD_HTTP.GET, "stayroom/paymentbystay", staySel);
});

const total = computed(() => {
	return allData.value.reduce(
		(acc: number, item: any) => acc + Number(item.amount),
		0,
	);
});
</script>
<template>
  <div class="py-4 px-5">
    <table class="w-full">
      <tr v-for="item in allData" :key="item.id" v-if="allData.length > 0">
        <td class="text-right pr-5 py-3">
          {{ typePay[item.type as keyof typeof typePay] }}
        </td>
        <td class="text-right pr-5">S/. {{ item.amount }}</td>
      </tr>
      <tr v-if="loading">
        <td>Cargando informacion...</td>
      </tr>
      <tr v-if="!loading">
        <td class="text-right pr-5 py-3 font-bold">Total a pagar</td>
        <td class="font-bold">S/. {{ total.toFixed(2) }}</td>
      </tr>
    </table>
  </div>
</template>
