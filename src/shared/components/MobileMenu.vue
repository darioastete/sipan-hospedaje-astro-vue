<script lang="ts" setup>
// import { useRouter } from "vue-router";
// const router = useRouter();
import ModalComponent from "@components/ModalComponent.vue";
import OptionMenuComponent from "@components/OptionMenuComponent.vue";
import type { OptionMenu } from "~/shared/types/OptionMenu.type";
import { Routes } from "@type/Routes.const";
import { ref } from "vue";

const openModal = ref(false);

const closeModalMenu = () => {
  openModal.value = false;
};

const openModalMenu = () => {
  selectedOption.value.active = false;
  openModal.value = true;
};
const selectedOption = ref<any>({
  active: false,
});
const selectOptionMenu = (optionSelect: OptionMenu) => {
  let active = false;
  if (optionSelect.children && optionSelect.children.length > 0) {
    active = true;
    selectedOption.value = { active, optionSelect };
  } else {
    closeModalMenu();
    // console.log(optionSelect.route);
    // router.push({ path: `${optionSelect.route}` });
    location.href = optionSelect.href;
  }
};
const logout = () => {
  localStorage.removeItem("token");
  // router.push({ path: "/login" });
  location.href = "/login";
};

// const pushProfile = () => {
//   router.push({ path: "/maintenance/user" });
// };
const onBack = () => {
  selectedOption.value.active = false;
};
</script>
<template>
  <button class="flex gap-1 items-center" @click="openModalMenu">
    <!-- <img :src="iMenu" width="20" /> -->
    <slot name="icon" />
    <!-- <span class="font-light">Menú</span> -->
  </button>
  <ModalComponent
    :model-value="openModal"
    @on-close="closeModalMenu"
    @update:model-value="closeModalMenu"
    @on-back="onBack"
    size="xl"
    :title="
      selectedOption.active
        ? selectedOption.optionSelect.text
        : 'Menú de Opciones'
    "
    :has-back-icon="selectedOption.active"
    :has-close-icon="true"
    :has-mobile-mode="true"
  >
    <template v-slot:main>
      <template v-if="selectedOption.active">
        <div
          class="flex flex-wrap gap-2 sm:gap-5 items-center justify-center sm:py-8"
        >
          <template
            v-for="(itemMenu, index) in selectedOption.optionSelect.children"
            :key="index"
          >
            <OptionMenuComponent
              :label="itemMenu.text"
              :icon="itemMenu.icon"
              @click="selectOptionMenu(itemMenu)"
            />
          </template>
        </div>
      </template>
      <template v-else>
        <div
          class="flex flex-wrap gap-2 sm:gap-5 items-center justify-center sm:py-8"
        >
          <template v-for="(itemMenu, index) in Routes" :key="index">
            <OptionMenuComponent
              :label="itemMenu.text"
              :icon="itemMenu.icon"
              @click="selectOptionMenu(itemMenu)"
            />
          </template>
        </div>
      </template>
    </template>
  </ModalComponent>
</template>
