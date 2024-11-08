<script setup lang="ts">
import { ref } from "vue";

const { iconType, icon } = defineProps<{
  type?: "button" | "reset" | "submit" | undefined;
  color?: "primary" | "warning" | "danger" | "secondary" | null;
  label?: string;
  icon?: string | null;
  iconLeft?: string;
  iconType?: "delete" | "edit" | "view" | string;
}>();

const iconShow = ref<string>();
if (icon) {
  iconShow.value = icon;
}

const getImageUrl = (img: string) => {
  return new URL(`../../assets/icons/${img}`, import.meta.url).href;
};

const iconsType = {
  none: "",
  delete: "btn-delete-white.svg",
  edit: "btn-edit-white.svg",
  view: "btn-view-white.svg",
};

const colorClasses: Record<
  "primary" | "warning" | "danger" | "secondary",
  string
> = {
  primary: "bg-primary-blue-100 text-white enabled:hover:bg-primary-blue-300",
  warning:
    "bg-primary-yellow-100 text-white enabled:hover:bg-primary-yellow-300",
  danger:
    "bg-primary-danger-100 text-white enabled:hover:bg-primary-danger-300",
  secondary: "bg-secondary-gray text-black",
};
</script>
<template>
  <button
    :type="type || 'submit'"
    :class="`sm:w-auto w-full transition-all ${
      colorClasses[color ?? 'primary']
    } ${
      !label && (icon || iconType) ? 'px-2' : 'px-5'
    } py-2 rounded-xl disabled:opacity-75`"
    v-bind="$attrs"
  >
    <div class="flex items-center justify-center gap-1">
      <img
        v-if="icon || iconType"
        :src="
          icon
            ? icon
            : getImageUrl(
                iconType && iconType in iconsType
                  ? iconsType[iconType as keyof typeof iconsType]
                  : ''
              )
        "
        class="w-4"
      />
      <span v-if="label" class="text-sm">{{ label }}</span>
      <img v-if="iconLeft" :src="iconLeft" class="w-4" />
    </div>
  </button>
</template>
