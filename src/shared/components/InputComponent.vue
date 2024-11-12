<script setup lang="ts">
defineProps<{
	label: string;
	type: string;
	id: string;
	hasError?: boolean;
	disabled?: boolean;
	search?: boolean;
}>();
const modelValue = defineModel();
const emit = defineEmits(["searchClick"]);

function sanitizeText(text: string): string {
	return text.replace(/[^a-zA-Z]/g, "");
}
</script>
<template>
  <div class="mb-5 mx-2">
    <label
      for="error"
      :class="`block sm:mb-2 text-2xs sm:text-xs font-medium capitalize sm:uppercase ${
        hasError ? 'text-red-700' : ''
      } `"
      >{{ label }}</label
    >
    <div class="flex">
      <input
        :type="type"
        v-model="modelValue"
        :disabled="disabled"
        :class="`text-2xs sm:text-xs border w-full p-2 sm:p-2.5 ${
          hasError
            ? ' bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm  focus:ring-red-500 focus:border-red-500'
            : ''
        } ${search ? 'rounded-l-lg' : 'rounded-lg'}`"
        :placeholder="label.toLocaleUpperCase()"
      />
      <button
        type="button"
        class="rounded-r-lg bg-primary-blue-100 text-white px-1 sm:px-2 text-2xs sm:text-xs"
        v-if="search"
        @click="$emit('searchClick')"
      >
        Buscar
      </button>
    </div>
    <!-- <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            <span class="font-medium">Oh, snapp!</span> Some error message.
        </p> -->
  </div>
</template>
