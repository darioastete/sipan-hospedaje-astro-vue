<script setup lang="ts">
import { InputValidators } from "@type/InputValidators.const";
import { formatText, satinizeText } from "@util/inputProccessor";
import { onMounted, ref, toRefs, watch } from "vue";

const AllowedInputTypes = [
	"text",
	"email",
	"number",
	"phone",
	"search",
	"url",
	"dni",
	"pasaporte",
];

const proxyProps = defineProps<{
	label: string;
	type: keyof typeof InputValidators;
	id?: string;
	hasError?: boolean;
	disabled?: boolean;
	search?: boolean;
	novalidate?: boolean;
}>();

const { type, novalidate } = toRefs(proxyProps);
const modelValue = defineModel();

const isValid = ref(false);
const touchedValid = ref(true);
const emit = defineEmits(["searchClick"]);

const validateInput = (value: any) => {
	const typeInput = type.value;
	const validator = InputValidators[typeInput];
	if (novalidate.value) {
		isValid.value = true;
		return;
	}
	isValid.value = validator ? validator(value) : false;
	// console.log(typeInput, isValid.value);
};

watch(modelValue, (value) => {
	const satinizedText = satinizeText(type.value, value);
	// const formattedText = (modelValue.value = formatText(satinizedText));
	validateInput(satinizedText);
	touchedValid.value = isValid.value;
	modelValue.value = satinizedText;
});

const onblur = () => {
	modelValue.value = formatText(type.value, modelValue.value as string);
};

const getTypeInput = () => {
	console.log(type.value);
	return AllowedInputTypes.includes(type.value) ? "text" : type.value;
	// return type === "number" ? "text" : type;
};

onMounted(() => {
	validateInput(modelValue.value);
});

defineExpose({
	isValid,
});
</script>
<template>
  <div class="mb-5 mx-2">
    <label
      :class="`block sm:mb-2 text-2xs sm:text-xs font-medium capitalize sm:uppercase ${
        !touchedValid ? 'text-red-700' : ''
      } `"
      >{{ label }}</label
    >
    <div class="flex">
      <input
        :type="`${getTypeInput()}`"
        v-model="modelValue"
        :disabled="disabled"
        :class="`text-2xs sm:text-xs border w-full p-2 sm:p-2.5 h-12 ${
          !touchedValid
            ? ' bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm  focus:ring-red-500 focus:border-red-500'
            : ''
        } ${search ? 'rounded-l-lg' : 'rounded-lg'}`"
        :placeholder="label.toLocaleUpperCase()"
        @blur="onblur"
      />
      <button
        type="button"
        class="bg-primary-blue-100 text-white enabled:hover:bg-primary-blue-300 rounded-r-lg px-1 sm:px-2 text-2xs sm:text-xs disabled:opacity-75"
        v-if="search"
        @click="$emit('searchClick')"
        :disabled="!isValid"
      >
        Buscar
      </button>
    </div>
    <!-- <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            <span class="font-medium">Oh, snapp!</span> Some error message.
        </p> -->
  </div>
</template>
