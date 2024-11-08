<script setup lang="ts">
import iBed from "@icon/bed-white.svg";
import ModalComponent from "@components/ModalComponent.vue";
import formStayComponent from "@room/components/formStayComponent.vue";
import Button from "@components/ButtonComponent.vue";

//MODAL IMPORTS
import imgLogo from "@img/logo_negro.svg";
import { ref } from "vue";

import { useHttp } from "@composables/useHttpUniversal.composable";
import { METHOD_HTTP } from "@type/MethodsHttp.const";
// import { useFindData } from "@composables/findComposable";
// import { createData } from "@composables/createComposable";
// import { deleteData } from "@composables/deleteComposable";
// import { updateData } from "@composables/updateComposable";
//FIND

const {
  executeRequest: find,
  error: errorFind,
  loading: loadingFind,
  result: resultFind,
} = useHttp();
const {
  executeRequest: create,
  error: errorCreate,
  loading: loadingCreate,
  result: resultCreate,
} = useHttp();
const {
  executeRequest: remove,
  error: errorRemove,
  loading: loadingRemove,
  result: resultRemove,
} = useHttp();
const {
  executeRequest: update,
  error: errorUpdate,
  loading: loadingUpdate,
  result: resultUpdate,
} = useHttp();

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
const isModalOpen = ref(false);
const propsProxy = defineProps<Props>();
const viewMode = ref(false);
const viewCleanRoom = ref(false);
const formStayRef = ref();
const closeModal = () => {
  isModalOpen.value = false;
};
const openModal = () => {
  isModalOpen.value = true;
  viewMode.value = false;
  viewCleanRoom.value = false;
  console.log(propsProxy.labelStatus);
  if (propsProxy.labelStatus.toLowerCase() == "ocupado") {
    findData();
    viewMode.value = true;
  }
  if (propsProxy.labelStatus.toLocaleLowerCase() == "limpieza") {
    viewCleanRoom.value = true;
  }
};
const initForm = {
  id: "",
  room_id: "",
  id_client: "",
  check_in_date: "",
  check_out_date: "",
  total_price: "",
  notes: "",
  client: {},
};
const form = ref<{
  id: string;
  room_id: string;
  id_client: string;
  check_in_date: string;
  check_out_date: string;
  total_price: string;
  notes: string;
  client: any;
}>(initForm);

const emit = defineEmits<{
  (e: "onCreate"): void;
}>();
const handleSubmit = async () => {
  await create(METHOD_HTTP.POST, "roomstays", undefined, form.value);
  if (errorCreate.value) return;
  closeModal();
  emit("onCreate");
};

const finishStadys = async () => {
  await remove("roomstays", resultFind.value.id);
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

const findData = async () => {
  await find(METHOD_HTTP.GET, "roomstays", propsProxy.idroom);
  if (errorFind.value) return;
  form.value = resultFind.value;
};

// const { color, number, status } = toRefs(propsProxy);
</script>
<template>
  <div
    :class="`w-32 bg-white px-5 py-4 rounded-lg flex flex-col hover:scale-105 hover:shadow-md transition-all gap-1 cursor-pointer`"
    @click="openModal"
  >
    <span class="text-2xl font-bold text-primary-blue-500">{{ number }}</span>
    <div class="flex text-right w-full justify-end">
      <img :src="iBed.src" alt="" class="opacity-10" />
    </div>
    <hr
      :class="`w-full h-1.5 border-0 rounded`"
      :style="`background-color: ${color};`"
    />
  </div>

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
          <div class="mt-5 flex justify-end gap-3" v-if="viewCleanRoom">
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
        <div class="sm:w-[70%]" v-if="!viewCleanRoom">
          <h1 class="text-2xs sm:text-2xl font-semibold hidden sm:block">
            Detalles
          </h1>
          <template v-if="viewMode">
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
                  ><span class="font-semibold">Ocupación:</span>
                  {{ form.client.ocupation }}</span
                >
              </div>
              <div class="text-xs flex gap-4 justify-between mb-4">
                <span
                  ><span class="font-semibold">Celular:</span>
                  {{ form.client.cell_phone }}</span
                >
                <span
                  ><span class="font-semibold">DNI/Pasaporte:</span>
                  {{ form.client.document }}</span
                >
              </div>
              <div class="text-xs flex gap-4 justify-between">
                <span
                  ><span class="font-semibold">Correo:</span>
                  {{ form.client.mail }}</span
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
          <formStayComponent
            v-else
            :view-mode="viewMode"
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
            @sumbit="handleSubmit"
            @sendCloseModal="closeModal"
          />
        </div>
      </div>
    </template>
  </ModalComponent>
  <!-- </template> -->
</template>
