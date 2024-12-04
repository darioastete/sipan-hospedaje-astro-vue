<script lang="ts" setup>
import Button from "@components/ButtonComponent.vue";
import ModalComponent from "@components/ModalComponent.vue";
// import imgLogo from "@img/logo_negro.svg";
import formClientComponent from "@maintenance/client/components/formClientComponent.vue";
import AdditionalForm from "@room/components/AdditionalForm.vue";
import Payments from "@room/components/PaymentsComponent.vue";
import TabsStatusRoom from "@room/components/TabsStatusRoom.vue";
import FormStayComponent from "@room/components/formStayComponent.vue";
import { onMounted, ref } from "vue";

import { useHttp } from "@composables/useHttpUniversal.composable";
import { METHOD_HTTP } from "@type/MethodsHttp.const";
const { executeRequest: create, error: errorCreate } = useHttp();
const { executeRequest: remove, error: errorRemove } = useHttp();
const { executeRequest: update, error: errorUpdate } = useHttp();
const {
	executeRequest: find,
	error: errorFind,
	result: resultFind,
} = useHttp();
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

const statusModal = defineModel("statusModal");

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
	await update(METHOD_HTTP.GET, "enableroom", propsProxy.idroom);
	if (errorUpdate.value) return;
	closeModal();
	emit("onCreate");
};

onMounted(() => {
	if (statusModal.value === "ocuped") {
		findData();
	}
});
</script>
<template>
  <ModalComponent
    :model-value="isModalOpen"
    @on-close="closeModal"
    @update:model-value="closeModal"
    @on-back="false"
    :has-mobile-mode="false"
    size="xs"
  >
    <!-- <template v-slot:main>
      <div class="flex flex-col justify-center sm:gap-6 w-full">
        <div
          class="flex flex-col sm:gap-5 items-center justify-center sm:w-[30%]"
        >
          <img
            :src="imgLogo.src"
            class="w-40 hidden sm:block"
            alt="Hospedaje Sipan"
          />
          <div
            class="flex items-center flex-col border p-3"
            :style="`border-color: ${color}; color: ${color}`"
          >
            <h2 class="text-2xl font-semibold">{{ number }}</h2>
            <p
              class="text-sm text-gray-500"
              :style="`border-color: ${color}; color: ${color}`"
            >
              {{ labelStatus }}
            </p>
          </div>

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
        <div
          class="sm:w-[70%]"
          v-if="statusModal !== 'cleaning' && statusModal !== 'mantenimiento'"
        >
          <TabsStatusRoom v-if="statusModal !== 'available'">
            <template v-slot:client>
              <section
                v-if="statusModal === 'ocuped'"
                class="flex flex-col mt-3 shadow-lg px-5 py-4 rounded-md"
              >
                <div class="text-xs flex gap-4 justify-between mb-4">
                  <span
                    ><span class="font-semibold">Nombre:</span>
                    {{ form.client?.name }}
                    {{ form.client?.last_name }}</span
                  >
                  <span
                    ><span class="font-semibold"
                      >{{ form.client?.document_name }}:</span
                    >
                    {{ form.client?.document }}</span
                  >
                </div>
              </section>
            </template>
            <template v-slot:stayDetails>
              <section
                class="flex flex-col mt-3 shadow-lg px-5 py-4 rounded-md"
              >
                <div class="flex gap-4 text-2xs sm:text-sm justify-between">
                  <span
                    ><span class="font-semibold">Piso:</span>
                    {{ flatName }}</span
                  >
                  <span
                    ><span class="font-semibold">N°:</span> {{ number }}</span
                  >
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
              <section
                v-if="statusModal === 'ocuped'"
                class="flex flex-col mt-3 shadow-lg px-5 py-4 rounded-md"
              >
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
            </template>
          </TabsStatusRoom>
          <template v-if="statusModal === 'ocuped'">
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
            v-if="statusModal === 'available'"
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
            </template>
          </FormStayComponent>
        </div>
      </div>
    </template> -->

    <template v-slot:main>
      <!-- <div class="flex items-center justify-center"> -->
      <section class="flex flex-col gap-2 items-center">
        <h2 class="text-xl font-semibold" :style="` color: ${color}`">
          N° {{ number }} 
        </h2>
        <small class="text-2xs -mt-6" :style="`color: ${color}`">{{
          labelStatus
        }}</small>

        <div class="flex text-2xs sm:text-sm justify-between gap-8">
          <span><span class="font-semibold">Piso:</span> {{ flatName }}</span>
          <!-- <span><span class="font-semibold">N°:</span> {{ number }}</span> -->
          <span
            ><span class="font-semibold">Tipo:</span> {{ categoryName }}</span
          >
        </div>
        <!-- <div class="flex gap-4"> -->
        <div class="flex flex-wrap gap-3">
          <span class="font-semibold">Incluye:</span>
          <div v-for="service in propsProxy.servicesRoom">
            <span>· {{ service.name }}</span>
          </div>
        </div>
        <!-- </div> -->
      </section>
      <!-- </div> -->
      <TabsStatusRoom v-if="statusModal !== 'cleaning' && statusModal !== 'mantenimiento'">
        <template v-slot:client v-if="statusModal === 'ocuped'">
          <section class="flex flex-col mt-3 shadow-lg px-5 py-4 rounded-md">
            <div class="text-xs flex gap-4 justify-between mb-4">
              <span
                ><span class="font-semibold">Cliente:</span>
                {{ form.client?.name }}
                {{ form.client?.last_name }}</span
              >
              <span
                ><span class="font-semibold"
                  >{{ form.client?.document_name }}:</span
                >
                {{ form.client?.document }}</span
              >
            </div>
          </section>
        <!-- </template>
        <template v-slot:stayDetails v-if="statusModal === 'ocuped'"> -->
          <section class="flex flex-col mt-3 shadow-lg px-5 py-4 rounded-md">
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
            
              <span
                ><span class="font-semibold">Nota:</span>
                {{ form.notes ?? "Sin notas" }}</span
              >
          </section>
        </template>
        <template v-slot:checkin v-if="statusModal === 'available'">
          <FormStayComponent
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
            </template>
          </FormStayComponent>
        </template>

        <template v-slot:stayDetails  v-if="statusModal === 'cleaning'"></template>
        <template v-slot:payments  v-if="statusModal === 'ocuped'"">
          <Payments :stay-sel="form.id" /></template>

        <template
          v-slot:damages
          v-if="statusModal === 'ocuped'"
        >
        <AdditionalForm :stay-sel="form.id" path="stayroom/damages"/>  

        </template>

        <template
          v-slot:services
          v-if="statusModal === 'ocuped'"
        >
        <AdditionalForm :stay-sel="form.id" path="stayroom/service"/>  

        </template>
      </TabsStatusRoom>

      <template v-if="statusModal === 'ocuped'">
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
    </template>
  </ModalComponent>
</template>
