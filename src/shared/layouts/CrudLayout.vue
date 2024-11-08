<script lang="ts" setup>
import ButtonComponent from "@components/ButtonComponent.vue";
import DataTableComponent from "@components/DataTableComponent.vue";
import iPlus from "@icon/btn-plus.svg";
import { ref, toRefs } from "vue";
import { watch } from "vue";
const child = ref();

interface Props {
	title: string;
	data: any[];
	headers: string[];
	search: string[];
	columns: string[];
	loading: boolean;
}

const propsProxy = defineProps<Props>();

const { title, data, headers, search, columns, loading } = toRefs(propsProxy);

const searchQuery = ref<string>();
const resultSearch = ref([...data.value]);

watch(data, (newData) => {
	resultSearch.value = newData;
});
const handleInput = () => {
	resultSearch.value = data.value.filter((item) => {
		return search.value.some((prop) =>
			item[prop]
				?.toString()
				?.toLowerCase()
				.includes(searchQuery.value?.toLowerCase()),
		);
	});
};

const emit = defineEmits<{
	(e: "openModal", value: object): void;
	(e: "confirmationModal", value: object): void;
}>();

const openModal = () => {
	child.value.openModal("new", null);
};
const closeModal = () => {
	child.value.closeModal();
};

defineExpose({
	openModal,
	closeModal,
});
</script>
<template>
  <div class="sm:p-5 flex flex-col gap-3 text-xs sm:text-sm">
    <div class="px-5 pt-3">
      <!-- <h1 class="text-2xl font-medium">{{ title }}</h1> -->
    </div>
    <div class="flex justify-between sm:flex-row sm:py-2 px-3 items-center">
      <div class="sm:flex">
        <input
          type="text"
          class="px-4 py-2 rounded-lg"
          @input="handleInput"
          placeholder="Buscar..."
          v-model="searchQuery"
        />
      </div>
      <div class="flex sm:justify-end gap-2">
        <!-- <slot name="actions"></slot> -->
        <ButtonComponent
          type="button"
          label="Crear"
          :icon="iPlus.src"
          @click="openModal"
        />
      </div>
    </div>
    <div class="bg-white rounded-lg py-5 px-5 shadow-md">
      <DataTableComponent
        :data="resultSearch"
        :headers="headers"
        :columns="columns"
        :loading="loading"
        @openModal="emit('openModal', $event)"
        @confirmationModal="emit('confirmationModal', $event)"
        ref="child"
      >
        <template v-slot:actions="{ item }" v-if="$slots.actionsRow">
          <slot name="actionsRow" :item="item"></slot>
        </template>

        <template v-slot:newModal="{ form }">
          <slot name="newModal" :item="form"></slot>
        </template>

        <template v-slot:editModal="{ form }">
          <slot name="editModal" :item="form"></slot>
        </template>
      </DataTableComponent>
    </div>
  </div>
</template>
