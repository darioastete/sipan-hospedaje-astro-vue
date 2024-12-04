<script lang="ts" setup>
import { computed, ref, useSlots, watch } from "vue";

interface Tab {
	name: string;
	label: string;
}

const tabs = ref<Tab[]>([
	{ name: "client", label: "Info." },
	{ name: "stayDetails", label: "Horario" },
	{ name: "checkin", label: "Check-In" },
	{ name: "services", label: "Servicios" },
	{ name: "damages", label: "Daños" },
	{ name: "payments", label: "Pagos" },
]);

const activeTab = ref<string>("client");

// Obtén los slots al inicio del setup
const slots = useSlots();

const visibleTabs = computed(() => {
	const value = tabs.value.filter((tab) => !!slots[tab.name]);
	activeTab.value = value[0].name;
	return value;
});
</script>
<template>
  <div
    class="mb-8 border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center"
  >
    <!-- Tabs Navigation -->
    <ul
      class="flex flex-wrap -mb-px text-sm font-medium text-center justify-center"
      role="tablist"
    >
      <li
        v-for="(tab, index) in visibleTabs"
        :key="index"
        class="me-2"
        role="presentation"
      >
        <button
          class="inline-block p-4 border-b-2 rounded-t-lg"
          :class="{
            'border-blue-500 text-blue-500': activeTab === tab.name,
            'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300':
              activeTab !== tab.name,
          }"
          @click="activeTab = tab.name"
          type="button"
          role="tab"
          :aria-controls="tab.name"
          :aria-selected="activeTab === tab.name"
        >
          <span class="text-xs">{{ tab.label }}</span>
        </button>
      </li>
    </ul>
    <!-- Tabs Content -->
    <div v-for="(tab, index) in tabs" :key="index">
      <div v-if="activeTab === tab.name">
        <slot :name="tab.name"></slot>
      </div>
    </div>
  </div>
</template>
