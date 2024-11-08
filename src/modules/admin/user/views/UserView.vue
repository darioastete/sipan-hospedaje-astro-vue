<script lang="ts" setup>
import CrudLayout from "@layout/CrudLayout.vue";
import formComponent from "@admin/user/components/formUserComponent.vue";
import { ref } from "vue";
// import { useData } from "@composables/getListComposable";
// import { createData } from "@composables/createComposable";
// import { updateData } from "@composables/updateComposable";
// import { deleteData } from "@composables/deleteComposable";
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
  email: "",
  password: "",
};

const form = ref(initialForm);

const handleOpenModal = (item: any) => {
  if (item !== null) {
    const newitem = { ...item };
    newitem.password = "";
    form.value = newitem;
  } else {
    resetForm();
  }
};

const formComponentRef = ref();
const resetForm = () => {
  form.value = { ...initialForm };
  // formComponentRef.value.clearForm();
};

const sendCloseModal = () => {
  crudComponent.value.closeModal();
};

const makeData = async () => {
  await getListAll(METHOD_HTTP.GET, "user");
};

const createItem = async () => {
  await create(METHOD_HTTP.POST, "user", undefined, form.value);
  if (errorCreate.value) return;
  sendCloseModal();
  makeData();
  resetForm();
};

const editItem = async () => {
  await update(METHOD_HTTP.PUT, "user", form.value.id, form.value);
  if (errorUpdate.value) return;
  sendCloseModal();
  makeData();
  resetForm();
};

const handleConfirmationModal = async (itemDelete: any) => {
  await remove(METHOD_HTTP.DELETE, "user", itemDelete.id);
  if (errorRemove.value) return;
  makeData();
  sendCloseModal();
};

makeData();
</script>
<template>
  <CrudLayout
    title="Usuarios"
    :data="result"
    :headers="['Nombre', 'E-mail']"
    :columns="['name', 'email']"
    :search="['name', 'email']"
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
        :editmode="false"
        @submit="$emit('submit')"
        ref="formComponentRef"
        v-model:name="form.name"
        v-model:email="form.email"
        v-model:password="form.password"
      />
    </template>

    <template v-slot:editModal="{ item }">
      <formComponent
        @submit="editItem"
        @sendCloseModal="sendCloseModal"
        :editmode="true"
        ref="formComponentRef"
        v-model:name="form.name"
        v-model:email="form.email"
        v-model:password="form.password"
      />
    </template>
  </CrudLayout>
</template>
