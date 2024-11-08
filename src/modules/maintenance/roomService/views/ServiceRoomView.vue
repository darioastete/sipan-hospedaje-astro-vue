<script lang="ts" setup>
import CrudLayout from "@layout/CrudLayout.vue";
import formComponent from "@maintenance/roomService/components/formServiceRoomComponent.vue";
import { ref } from "vue";
// import { useData } from "@composables/getListComposable";
// import { createData } from "@composables/createComposable";
// import { updateData } from "@composables/updateComposable";
// import { deleteData } from "@composables/deleteComposable";
import type { CrudWhithName } from "@type/simple.crud";
import { useHttp } from "@composables/useHttpUniversal.composable";
import { METHOD_HTTP } from "@type/MethodsHttp.const";

const { executeRequest: getListAll, result, loading } = useHttp();
const { executeRequest: create, error: errorCreate } = useHttp();
const {
  executeRequest: update,
  error: errorUpdate,
  loading: loadingUpdate,
} = useHttp();
const {
  executeRequest: remove,
  error: errorRemove,
  loading: loadingRemove,
} = useHttp();
const crudComponent = ref();

const initialForm = {
  id: "",
  name: "",
};

const form = ref<CrudWhithName>(initialForm);

const handleOpenModal = (item: any) => {
  if (item !== null) {
    const newitem = { ...item };
    form.value = newitem;
  } else {
    resetForm();
  }
};

const formComponentRef = ref();
const resetForm = () => {
  form.value = { ...initialForm };
  formComponentRef.value.clearForm();
};

const sendCloseModal = () => {
  crudComponent.value.closeModal();
};

const makeData = async () => {
  await getListAll(METHOD_HTTP.GET, "service");
};

const createItem = async () => {
  await create(METHOD_HTTP.POST, "service", undefined, form.value);
  if (errorCreate.value) return;
  sendCloseModal();
  makeData();
  resetForm();
};

const editItem = async () => {
  await update(METHOD_HTTP.PUT, "service", form.value.id, form.value);
  if (errorUpdate.value) return;
  sendCloseModal();
  makeData();
  resetForm();
};

const handleConfirmationModal = async (itemDelete: any) => {
  await remove("service", itemDelete.id);
  if (errorRemove.value) return;
  makeData();
  sendCloseModal();
};

makeData();
</script>
<template>
  <CrudLayout
    title="Servicios"
    :data="result"
    :headers="['Nombre']"
    :columns="['name']"
    :search="['name']"
    :loading="loading"
    @openModal="handleOpenModal"
    @confirmationModal="handleConfirmationModal"
    ref="crudComponent"
  >
    <template v-slot:actionsRow="{ item }" />
    <template v-slot:newModal="{ item }">
      <formComponent
        @sumbit="createItem"
        @sendCloseModal="sendCloseModal"
        ref="formComponentRef"
        v-model:name="form.name"
      />
    </template>

    <template v-slot:editModal="{ item }">
      <formComponent
        @submit="editItem"
        @sendCloseModal="sendCloseModal"
        ref="formComponentRef"
        v-model:name="form.name"
      />
    </template>
  </CrudLayout>
</template>
