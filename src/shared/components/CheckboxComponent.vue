<script setup lang="ts">
interface checkBoxProps {
	label: string;
	value: any;
	id: string;
}
defineProps<checkBoxProps>();

const modelValue = defineModel();
</script>
<template>
    <div class="flex items-center mb-4 mx-3">
        <input
            :id="id"
            type="checkbox"
            :value="value"
            v-model="modelValue"
            class="w-4 h-4 text-primary-blue-300 bg-gray-100 border-gray-300 rounded focus:ring-primary-blue-100 focus:ring-2"
        />
        <label
            :for="id"
            class="ms-2 text-sm font-medium text-primary-blue-500 uppercase"
            >{{ label }}</label
        >
    </div>
</template>
