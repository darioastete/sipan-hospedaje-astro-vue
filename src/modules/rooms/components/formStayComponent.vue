<script setup lang="ts">
import Button from "@components/ButtonComponent.vue";
import Input from "@components/InputComponent.vue";
// import formClientComponent from "@maintenance/client/components/formClientComponent.vue";

import { computed, ref, watch } from "vue";

const room_id = defineModel("room_id", { type: String, default: "" });
const id_client = defineModel("id_client", { type: String, default: "" });
const check_in_date = defineModel("check_in_date", {
	type: String,
	default: "",
});
const check_out_date = defineModel("check_out_date", {
	type: String,
	default: "",
});
const total_price = defineModel("total_price", { type: String, default: "" });
const notes = defineModel("notes", { type: String, default: "" });
const client = defineModel("client", { type: Object, default: {} });
const clientref = defineModel("clientref", { default: { isValid: false } });

const { roomIdSel, listTypeDoc } = defineProps<{
	listTypeDoc: any[];
	roomIdSel: string;
}>();

// const emit = defineEmits(["submit", "sendCloseModal"]);
const emit = defineEmits<{
	(e: "submit", value: any): void;
	(e: "sendCloseModal"): void;
}>();

// const emit = defineEmits<{
// 	(e: "openModal", value: object): void;
// 	(e: "closeModal"): void;
// 	(e: "confirmationModal", value: object): void;
// }>();

room_id.value = roomIdSel;

const form = ref({
	room_id,
	id_client,
	check_in_date,
	check_out_date,
	total_price,
	notes,
	client,
});

const checkInInput = ref({ isValid: false });
const checkOutInput = ref({ isValid: false });
const totalInput = ref({ isValid: false });
const validationError = ref<string | null>(null);

watch(client, (value) => {
	console.log(value);
});

// Método para validar las fechas
const validateDates = computed(() => {
	// Limpiar errores anteriores
	validationError.value = null;

	// Convertir las fechas a objetos Date
	const checkIn = form.value.check_in_date
		? new Date(form.value.check_in_date)
		: null;
	const checkOut = form.value.check_out_date
		? new Date(form.value.check_out_date)
		: null;

	if (checkIn && checkOut) {
		const difference = (checkOut.getTime() - checkIn.getTime()) / (60 * 1000); // Diferencia en minutos

		// Validar que la fecha de salida sea mayor que la de ingreso
		if (difference <= 0) {
			validationError.value =
				"La fecha y hora de salida debe ser mayor a la fecha y hora de ingreso.";
			return false;
		}

		// Validar que la estancia mínima sea de al menos 30 minutos
		if (difference < 30) {
			validationError.value =
				"La estancia mínima debe ser de al menos 30 minutos.";
			return false;
		}

		return true;
	}
	return false;
});

const createStay = async () => {
	emit("submit", form.value);
};
</script>
<template>
  <form @submit.prevent="createStay()">
    <section class="flex flex-col mt-3 shadow-lg px-5 py-4 rounded-md">
      <div class="flex justify-between items-center">
        <h2 class="sm:text-sm text-primary-yellow-300 mb-3">Cliente</h2>
      </div>
      <slot name="client"></slot>
    </section>

    <section class="flex flex-col mt-3 shadow-lg px-5 py-4 rounded-md">
      <h2 class="sm:text-sm text-primary-yellow-300 mb-3">Datos de Reserva</h2>
      <div class="grid grid-cols-2">
        <Input
          id="RoomFormStay"
          label="Ingreso"
          type="datetime-local"
          v-model="check_in_date"
          ref="checkInInput"
        />
        <Input
          id="RoomFormStay"
          label="Salida"
          type="datetime-local"
          v-model="check_out_date"
          ref="checkOutInput"
        />
        <Input
          id="RoomFormStay"
          label="Total"
          type="money"
          v-model="total_price"
          ref="totalInput"
        />

        <Input id="RoomFormStay" label="Notas" type="text" v-model="notes" />
      </div>
    </section>
    <div class="flex justify-end gap-2 mt-4">
      <Button
        type="button"
        color="secondary"
        @click="$emit('sendCloseModal')"
        label="Cancelar"
      />
      <Button
        label="Guardar Cambios"
        :disabled="
          !checkInInput.isValid ||
          !checkOutInput.isValid ||
          !totalInput.isValid ||
          !validateDates ||
          !clientref.isValid
        "
      />
    </div>
  </form>
</template>
