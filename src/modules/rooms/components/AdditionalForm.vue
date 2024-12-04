<script lang="ts" setup>
import Button from "@components/ButtonComponent.vue";
import Input from "@components/InputComponent.vue";
import { useHttp } from "@composables/useHttpUniversal.composable";
import { METHOD_HTTP } from "@type/MethodsHttp.const";
import { computed, onMounted, ref } from "vue";

const { staySel, path } = defineProps<{
	staySel: string;
	path: string;
}>();

const {
	executeRequest: create,
	error: errorCreate,
	loading: loadingCreate,
} = useHttp();

const {
	executeRequest: getAll,
	result: allData,
	loading: loadingGetAll,
} = useHttp();

const {
	executeRequest: deleteItem,
	error: errorDelete,
	loading: loadingDelete,
} = useHttp();

const form = ref({
	description: "",
	amount: "",
	stay_id: staySel,
});

const createItem = async () => {
	await create(METHOD_HTTP.POST, path, undefined, form.value);
	if (errorCreate.value) return;
	form.value.description = "";
	form.value.amount = "";
	await getAll(METHOD_HTTP.GET, `${path}bystay`, staySel);
};

const removeItem = async (id: string) => {
	await deleteItem(METHOD_HTTP.DELETE, path, id);
	if (errorCreate.value) return;
	await getAll(METHOD_HTTP.GET, `${path}bystay`, staySel);
};

onMounted(async () => {
	await getAll(METHOD_HTTP.GET, `${path}bystay`, staySel);
});

const total = computed(() => {
	return allData.value.reduce(
		(acc: number, item: any) => acc + Number(item.amount),
		0,
	);
});

const conceptInput = ref({ isValid: false });
const amountInput = ref({ isValid: false });
</script>
<template>
  <div class="flex items-center p-6">
    <Input
      v-model="form.description"
      label="Concepto"
      type="text"
      ref="conceptInput"
    />
    <Input v-model="form.amount" label="Monto" type="money" ref="amountInput" />
    <Button
      label="Agregar"
      class="h-12"
      @click="createItem"
      :disabled="!conceptInput.isValid || !amountInput.isValid || loadingCreate"
    />
  </div>
  <table class="w-full table">
    <thead class="shadow-md h-12">
      <tr>
        <th>Concepto</th>
        <th>Monto</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="loadingCreate || loadingDelete || loadingGetAll">
        <td colspan="3" class="text-center py-4">Cargando...</td>
      </tr>
      <tr v-else-if="allData.length < 1">
        <td colspan="3" class="text-center py-4">No hay registros</td>
      </tr>
      <tr v-else v-for="item in allData">
        <td class="py-5 px-4">{{ item.description }}</td>
        <td class="text-right">{{ item.amount }}</td>
        <td class="text-center">
          <Button
            iconType="delete"
            color="danger"
            @click="removeItem(item.id)"
          />
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td class="text-right font-bold">Total S/.</td>
        <td class="text-right font-bold">{{ total.toFixed(2) }}</td>
        <td></td>
      </tr>
    </tfoot>
  </table>
</template>
