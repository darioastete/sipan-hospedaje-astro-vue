<script lang="ts" setup>
import Button from "@components/ButtonComponent.vue";
import ModalComponent from "@components/ModalComponent.vue";
import { useHttp } from "@composables/useHttpUniversal.composable";
import imgLogo from "@img/logo_negro.svg";
import formClientComponent from "@maintenance/client/components/formClientComponent.vue";
import FormStayComponent from "@room/components/formStayComponent.vue";
import { METHOD_HTTP } from "@type/MethodsHttp.const";

import { ref, watch } from "vue";
const { executeRequest: create, error: errorCreate } = useHttp();
const { executeRequest: remove, error: errorRemove } = useHttp();
const { executeRequest: update, error: errorUpdate } = useHttp();
const emit = defineEmits<(e: "onCreate") => void>();
const formClientRef = ref<any>();
const handleSubmit = async ($event: any) => {
	form.value.client = formClientRef.value.form;
	await create(METHOD_HTTP.POST, "roomstays", undefined, form.value);
	if (errorCreate.value) return;
	closeModal();
	emit("onCreate");
};

interface IRoom {
	id: string;
	room_id: string;
	id_client: string;
	check_in_date: string;
	check_out_date: string;
	total_price: string;
	notes: string;
	client: any;
}
const form = ref<IRoom>({} as IRoom);

const {
	executeRequest: find,
	error: errorFind,
	result: resultFind,
} = useHttp();

const isModalOpen = defineModel<boolean>("isModalOpen");
const findData = async () => {
	await find(METHOD_HTTP.GET, "roomstays", propsProxy.idroom);
	if (errorFind.value) return;
	form.value = resultFind.value;
};
interface Props {
	status: string;
	number: number;
	flatName: string;
	categoryName: string;
	color: string;
	idroom: string;
	labelStatus: string;
	documentTypes: any[];
	servicesRoom: any[];
}

const statusModal = defineModel<string>("statusModal");

watch(statusModal, (value) => {
	if (value === "ocuped") {
		findData();
	}
});
const propsProxy = defineProps<Props>();

const formStayRef = ref();
const closeModal = () => {
	isModalOpen.value = false;
};

const finishStadys = async () => {
	await remove(METHOD_HTTP.DELETE, "roomstays", resultFind.value.id);
	if (errorRemove.value) return;
	closeModal();
	emit("onCreate");
};

const enableRoom = async () => {
	await update(METHOD_HTTP.PUT, "enableroom", propsProxy.idroom, {});
	if (errorUpdate.value) return;
	closeModal();
	emit("onCreate");
};
</script>
<template>
  <ModalComponent
    :model-value="isModalOpen"
    @on-close="closeModal"
    @update:model-value="closeModal"
    @on-back="false"
    :has-mobile-mode="false"
    size="lg"
  >
    <template v-slot:main>
      <div class="flex flex-col sm:flex-row justify-around sm:gap-6">
        <div class="flex flex-col sm:gap-5 items-center sm:w-[30%]">
          <img
            :src="imgLogo.src"
            class="w-40 hidden sm:block"
            alt="Hospedaje Sipan"
          />
          {{ statusModal }}
          <span
            class="px-5 py-2 border-b-8 rounded-lg border sm:text-2xl font-semibold shadow-md"
            :style="`border-color: ${color}; color: ${color}`"
            >{{ labelStatus }}</span
          >
          <section class="flex flex-col mt-3 shadow-lg px-5 py-4 rounded-md">
            <h2 class="text-2xs sm:text-lg text-primary-yellow-300 mb-3">
              Habitación
            </h2>
            <div
              class="flex sm:flex-col gap-4 text-2xs sm:text-sm justify-between"
            >
              <span
                ><span class="font-semibold">Piso:</span> {{ flatName }}</span
              >
              <span><span class="font-semibold">N°:</span> {{ number }}</span>
              <span
                ><span class="font-semibold">Tipo:</span>
                {{ categoryName }}</span
              >
              <div class="">
                <span class="font-semibold">Servicios:</span>
                <ul>
                  <li v-for="service in propsProxy.servicesRoom">
                    + {{ service.name }}
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <div
            class="mt-5 flex justify-end gap-3"
            v-if="statusModal === 'cleaning'"
          >
            <Button
              type="button"
              label="Cancelar"
              color="secondary"
              @click="closeModal"
            />
            <Button
              type="button"
              label="Terminar Limpieza"
              color="primary"
              @click="enableRoom"
            />
          </div>
        </div>
        <div class="sm:w-[70%]" v-if="statusModal !== 'cleaning'">
          <h1 class="text-2xs sm:text-2xl font-semibold hidden sm:block">
            Detalles
          </h1>
          <template v-if="statusModal === 'ocuped'">
            <section class="flex flex-col mt-3 shadow-lg px-5 py-4 rounded-md">
              <span class="sm:text-lg text-primary-yellow-300 mb-3">
                Cliente
              </span>
              <div class="text-xs flex gap-4 justify-between mb-4">
                <span
                  ><span class="font-semibold">Nombre:</span>
                  {{ form.client.name }}
                  {{ form.client.last_name }}</span
                >
                <span
                  ><span class="font-semibold">DNI:</span>
                  {{ form.client.document }}</span
                >
              </div>
              <div class="text-xs flex gap-4 justify-between mb-4">
                <span
                  ><span class="font-semibold">Celular:</span>
                  {{ form.client.cell_phone }}</span
                >
              </div>
            </section>
            <section class="flex flex-col mt-3 shadow-lg px-5 py-4 rounded-md">
              <h2 class="text-lg text-primary-yellow-300 mb-3">
                Datos de Estadia
              </h2>
              <div class="text-xs flex gap-4 justify-between mb-4">
                <span
                  ><span class="font-semibold">Ingreso:</span>
                  {{ form.check_in_date }}</span
                >
                <span
                  ><span class="font-semibold">Salida:</span>
                  {{ form.check_out_date }}</span
                >
              </div>
              <div class="text-xs flex gap-4 justify-between mb-4">
                <span
                  ><span class="font-semibold">Total:</span>
                  {{ form.total_price }}</span
                >
                <span
                  ><span class="font-semibold">Nota:</span>
                  {{ form.notes ?? "Sin notas" }}</span
                >
              </div>
            </section>
            <div class="mt-5 flex justify-end gap-3">
              <Button
                type="button"
                label="Cancelar"
                color="secondary"
                @click="closeModal"
              />
              <Button
                type="button"
                label="Finalizar Estadia"
                color="danger"
                @click="finishStadys"
              />
            </div>
          </template>
          <FormStayComponent
            v-else
            ref="formStayRef"
            :list-type-doc="documentTypes"
            :room-id-sel="idroom"
            v-model:room_id="form.room_id"
            v-model:id_client="form.id_client"
            v-model:check_in_date="form.check_in_date"
            v-model:check_out_date="form.check_out_date"
            v-model:total_price="form.total_price"
            v-model:notes="form.notes"
            v-model:client="form.client"
            @submit="handleSubmit"
            @sendCloseModal="closeModal"
          >
            <template v-slot:client>
              <formClientComponent ref="formClientRef" :create-button="false" />
              <!-- <formClientComponent
                ref="formClientRef"
                :create-button="false"
                v-model:name="form.client.name"
                v-model:last_name="form.client.last_name"
                v-model:id_document_type="form.client.id_document_type"
                v-model:document="form.client.document"
              /> -->
            </template>
          </FormStayComponent>
        </div>
      </div>
    </template>
  </ModalComponent>
</template>
