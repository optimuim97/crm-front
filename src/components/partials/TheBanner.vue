<template>
  <nav
    class="z-40 bg-white dark:bg-dark-card nav navbar navbar-expand-xl navbar-light iq-navbar py-0"
    x-data="{ selected: null }"
    :class="setting.header_navbar"
  >
    <div class="w-full px-7 py-2">
      <div class="relative">
        <!-- Mobile menu button-->
        <div
          class="absolute flex items-center px-2 py-1 text-xl border border-secondary-500 rounded lg:hidden"
          :class="
            setting.theme_scheme_direction == 'ltr' ? 'right-0' : 'left-0'
          "
        >
          <button
            type="button"
            @click="selected == 1 ? (selected = null) : (selected = 1)"
            class="inline-flex items-center justify-center text-xl text-secondary-500 rounded"
            onclick="toggleNavbar('cancel', 'mobileicon')"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="block w-8 h-8"
              id="mobileicon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              class="hidden w-6 h-6"
              id="cancel"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="gray"
            >
              <path
                d="M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z"
              ></path>
            </svg>
          </button>
        </div>
        <!-- Mobile menu button END-->
        <div class="flex">
          <div class="flex items-center button gap-2">
            <div
              class="btn btn-primary btn-icon btn-sm rounded-full"
              data-toggle="sidebar"
              data-active="true"
              @click="sidebarMini"
            >
              <span class="btn-inner">
                <svg width="20px" height="20px" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
                  ></path>
                </svg>
              </span>
            </div>
            <div class="flex items-center gap-4">
              <!--                            {{ > components / widgets / logo }}-->
              <h4 class="mb-0" href="#">{{ appName }}</h4>
            </div>
          </div>

          <div
            class="hidden lg:flex lg:flex-grow transition-all duration-700 ease-in-out"
          >
            <ul
              class="flex items-center mb-2 ml-auto rtl:ml-0 rtl:mr-auto lg:mb-0"
            >
              <li
                class="ltr:border-r rtl:border-l ltr:pr-4 rtl:pl-4 dark:border-secondary-700"
              >
                <div class="">
                  <p class="text-sm font-semibold uppercase m-2">
                    {{ adminConnecte.name }}
                  </p>
                </div>
              </li>
              <li :x-data="toggleProfileIcon === true" id="itemdropdown1">
                <a
                  class="flex items-center p-2 ltr:px-2 rtl:pl-2"
                  href="#"
                  @click="toggleProfileIcon = !toggleProfileIcon"
                >
                  <div class="btn btn-primary btn-sm btn-icon rounded-full">
                    <span class="btn-inner">
                      <!--                                        <img v-if="adminConnecte.urlImage" :src="adminConnecte.urlImage" class="icon-32  rounded" alt="profile-pic" />-->
                      <img
                        v-if="adminConnecte.urlImage"
                        src="../../assets/images/avatars/01.png"
                        class="icon-32 rounded"
                        alt="profile-pic"
                      />
                      <svg
                        class="icon-32"
                        width="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.997 15.1746C7.684 15.1746 4 15.8546 4 18.5746C4 21.2956 7.661 21.9996 11.997 21.9996C16.31 21.9996 19.994 21.3206 19.994 18.5996C19.994 15.8786 16.334 15.1746 11.997 15.1746Z"
                          fill="currentColor"
                        ></path>
                        <path
                          opacity="0.4"
                          d="M11.9971 12.5838C14.9351 12.5838 17.2891 10.2288 17.2891 7.29176C17.2891 4.35476 14.9351 1.99976 11.9971 1.99976C9.06008 1.99976 6.70508 4.35476 6.70508 7.29176C6.70508 10.2288 9.06008 12.5838 11.9971 12.5838Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </a>
                <ul
                  v-show="toggleProfileIcon === true"
                  class="absolute z-40 w-40 p-0 py-2 right-1.5 rounded bg-white dark:bg-dark-card"
                  v-if="false"
                >
                  <li>
                    <a
                      class="block text-left pr-[4.5rem] pl-[1rem] py-1 ml-[0.5rem] mr-[0.5rem] rtl:text-right rtl:pl-14 rtl:pr-4 whitespace-nowrap hover:text-white hover:bg-primary-500 hover:rounded"
                      href="#"
                    >
                      <!-- <RouterLink :to="{ name: 'Profil_Administrateur' }"> -->
                      <span class="item-name">Profil</span>
                      <!-- </RouterLink> -->
                    </a>
                  </li>
                  <li>
                    <a
                      class="block text-left pr-[4.5rem] pl-[1rem] py-1 ml-[0.5rem] mr-[0.5rem] rtl:text-right rtl:pl-14 rtl:pr-4 whitespace-nowrap hover:text-white hover:bg-primary-500 hover:rounded"
                      href=""
                      @click="logout"
                      >Déconnexion</a
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
import {
  setting,
  selected,
  // menu_active,
  appName,
  // toggle,
  sidebarMini,
  // open,
  toggleProfileIcon,
} from "@/utils/settings";

import axios from "axios";
import { onMounted, ref } from "vue";
import { toast } from "vue3-toastify";
import useAuthStore from "../../stores/index";
import { useRouter } from "vue-router";
const authStore = useAuthStore();

const adminConnecte = ref({});
const router = useRouter();

const logout = () => {
  authStore.logout();
  toast.success("Vous êtes déconnecté", { autoClose: 3000 });
  router.push({ name: "Login" });
};

const getInfosCurrentAdmin = async () => {
  try {
    const datas = await axios.get("/user");
    adminConnecte.value = datas.data;

    console.log({ adminConnecte: adminConnecte.value });
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  getInfosCurrentAdmin();
});
</script>

<style scoped></style>
