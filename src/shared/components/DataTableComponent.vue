<script setup lang="ts">
import ButtonComponent from "@components/ButtonComponent.vue";
import ModalComponent from "@components/ModalComponent.vue";
import iLoader from "@icon/loader-blue.svg";
import { ref } from "vue";
import { computed } from "vue";
import { toRefs } from "vue";

interface Props {
	headers: string[];
	columns: string[];
	data: any[];
	loading: boolean;
}

const propsProxy = defineProps<Props>();
const { data, headers, columns, loading } = toRefs(propsProxy);

const buttons: {
	type: "edit" | "delete" | "new";
	color: "warning" | "danger" | "primary" | "secondary";
	iconType: string;
}[] = [
	{ type: "edit", color: "warning", iconType: "edit" },
	{ type: "delete", color: "danger", iconType: "delete" },
];

const modals = {
	delete: ref(false),
	edit: ref(false),
	new: ref(false),
};
const modalType = ref<keyof typeof modals>();
const rowSelected = ref();

const emit = defineEmits<{
	(e: "openModal", value: object): void;
	(e: "closeModal"): void;
	(e: "confirmationModal", value: object): void;
}>();

const openModal = (modalTypeKey: keyof typeof modals, row: any) => {
	modals[modalTypeKey].value = true;
	modalType.value = modalTypeKey;
	rowSelected.value = row;
	emit("openModal", row);
};

const closeModal = () => {
	if (modalType.value) {
		modals[modalType.value].value = false;
	}
	emit("closeModal");
};

const isModalOpen = computed(() => {
	return Object.values(modals).some((modal) => modal.value);
});

const handleConfirmationModal = () => {
	emit("confirmationModal", rowSelected.value);
};

defineExpose({
	openModal,
	closeModal,
});
</script>
<template>
  <table class="table-auto w-full text-2xs md:text-xs">
    <thead>
      <tr class="border-b">
        <template v-for="header in headers">
          <th class="pb-4">{{ header }}</th>
        </template>
        <th v-if="$slots.actions" class="pb-4">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="!loading">
        <template v-if="data.length > 0">
          <tr v-for="row in data" class="border-b py-4">
            <td
              v-for="col in columns"
              :class="`${
                col !== 'name' && col !== 'last_name' && col !== 'description'
                  ? 'text-center'
                  : ''
              }`"
            >
              <!-- {{ row[col] }} -->
              <div v-if="$slots.additional">
                <slot name="additional" :item="{ row, col }"></slot>
              </div>
              <div class="" v-else>
                {{ row[col] }}
              </div>
            </td>
            <td
              v-if="$slots.actions"
              class="flex gap-1 justify-center py-4 items-center"
            >
              <slot name="actions" :item="row"></slot>

              <ButtonComponent
                v-for="button in buttons"
                :key="button.type"
                :type="'button'"
                :color="button.color"
                :icon-type="button.iconType"
                @click="openModal(button.type, row)"
              />
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td :colspan="columns.length + 1" class="text-center pt-5">
              <span class="text-gray-400">No se encontraron datos</span>
            </td>
          </tr>
        </template>
      </template>
      <template v-else>
        <tr>
          <td :colspan="columns.length + 1" class="text-center py-4">
            <div class="flex gap-2 justify-center items-center">
              <img :src="iLoader.src" class="animate-spin" />
              <span>Cargando ...</span>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>

  <ModalComponent
    :model-value="isModalOpen"
    @on-close="closeModal"
    @update:model-value="closeModal"
    @on-back="false"
    :has-mobile-mode="false"
  >
    <template v-slot:main>
      <template v-if="modalType == 'new'">
        <slot name="newModal" :form="rowSelected"></slot>
      </template>
      <template v-if="modalType == 'edit'">
        <slot name="editModal" :form="rowSelected"></slot>
      </template>
      <template v-if="modalType == 'delete'">
        <div class="flex flex-col justify-center text-center gap-3">
          <h1 class="text-xl font-medium">Advertencia</h1>
          <h2 class="text-sm">¿Está seguro de que deseas eliminarlo?</h2>
          <div class="flex justify-center gap-2 mt-5">
            <ButtonComponent
              label="Cancelar"
              color="warning"
              type="button"
              @click="closeModal"
            />
            <ButtonComponent
              label="Confirmar"
              type="button"
              @click="handleConfirmationModal"
            />
          </div>
        </div>
      </template>
    </template>
  </ModalComponent>
</template>
