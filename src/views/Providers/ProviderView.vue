<script setup>
import { onMounted, ref } from "vue";
import useProviders from "@/services/providers";
import DataTable from "primevue/datatable";
import Button from "primevue/button";
import TheSidebar from "@/components/partials/TheSidebar.vue";
import TheBanner from "@/components/partials/TheBanner.vue";
import TheHeaderNav from "@/components/partials/TheHeaderNav.vue";
import TheLottieLoader from "@/components/partials/TheLottieLoader.vue";
import Column from "primevue/column";

import ProviderModal from "@/components/modals/Providers/ProviderModal.vue";
// import UpdateProductModal from "@/components/Parametres/Providers/UpdateProductModal.vue";

const isDropdownOpen = ref([]);
const showMoreActions = (index) => {
  isDropdownOpen.value[index] = !isDropdownOpen.value[index];
};

const showModal = ref(false);
const showUpdateModal = ref(false);

const { providers, isLoading, loading, getProviders } = useProviders();

const updateList = async () => {
  await getProviders();
};

onMounted(() => {
  getProviders();
});

const showModal_ = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const closeUpdateModal = () => {
  showUpdateModal.value = false;
};
</script>

<template>
  <!--Nav Start-->
  <TheSidebar></TheSidebar>

  <main class="main-content">
    <div class="relative">
      <TheBanner></TheBanner>
      <!--Nav Start-->
      <TheHeaderNav
        :pageTitle="`Fournisseurs`"
        page-description="Gestion des Fournisseurs"
      ></TheHeaderNav>
      <!-- Nav Header Component End -->
      <!--Nav End-->
    </div>

    <div
      class="p-6 lg:p-8 footer-inner mx-auto lg:py-0 md:-mt-14 container-fluid"
      x-bind:class="setting.page_layout"
    >
      <div class="flex flex-wrap">
        <div class="flex-auto w-full">
          <TheLottieLoader :show-anim="isLoading" />
          <div
            class="relative flex flex-col overflow-hidden bg-white rounded-lg shadow-lg dark:bg-dark-card"
            v-if="!isLoading"
          >
            <div class="pb-6 pt-2 px-0">
              <!-- {{ Providers }} -->
              <div class="overflow-x-auto">
                <div class="mt-6 overflow-x-auto">
                  <DataTable
                    :loading="loading"
                    dataKey="id"
                    ref="dt"
                    filterDisplay="menu"
                    :value="providers"
                    paginator
                    :rows="10"
                    tableStyle="min-width: 50rem"
                  >
                    <template #header>
                      <div class="flex justify-between">
                        <div class="flex justify-start gap-2">
                          <Button
                            icon="pi pi-plus"
                            label="Ajouter"
                            outlined
                            @click="showModal_()"
                            class="btn btn-primary"
                          />
                        </div>
                      </div>
                    </template>
                    <template #empty> Aucune Provider </template>
                    <template #loading> Chargement... </template>

                    <Column header="Nom">
                      <template #body="slotProps">
                        <td class="py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <h6
                              class="text-base capitalize truncate hover:text-clip"
                            >
                              {{ slotProps.data.name }}
                            </h6>
                          </div>
                        </td>
                      </template>
                    </Column>

                    <Column header="Numéro ">
                      <template #body="slotProps">
                        <td class="py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <h6
                              class="text-base capitalize truncate hover:text-clip"
                            >
                              {{ slotProps.data.phone_number ?? '-' }}
                            </h6>
                          </div>
                        </td>
                      </template>
                    </Column>

                    <Column header="Email ">
                      <template #body="slotProps">
                        <td class="py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <h6
                              class="text-base capitalize truncate hover:text-clip"
                            >
                              {{ slotProps.data.email ?? '-' }}
                            </h6>
                          </div>
                        </td>
                      </template>
                    </Column>

                    <Column header="Référence">
                      <template #body="slotProps">
                        <td class="py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <h6
                              class="text-base capitalize truncate hover:text-clip"
                            >
                              {{ slotProps.data.reference ?? 0 }}
                            </h6>
                          </div>
                        </td>
                      </template>
                    </Column>

                    <Column header="Date de Création">
                      <template #body="slotProps">
                        <td class="py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <h6
                              class="text-base capitalize truncate hover:text-clip"
                            >
                              {{
                                $filters.formatDate(slotProps.data.created_at)
                              }}
                            </h6>
                          </div>
                        </td>
                      </template>
                    </Column>

                    <Column header="Action">
                      <template #body="slotProps">
                        <!-- Plus d'actions -->
                        <div>
                          <a
                            class="btn bg-[#eee] btn-sm btn-icon rounded-full"
                            title="Plus d'actions"
                            @click="showMoreActions(slotProps.index)"
                          >
                            <span
                              class="btn-inner pi pi-ellipsis-v"
                              data-pc-section="icon"
                            ></span>
                          </a>
                          <div
                            class="absolute z-50 right-4 py-2 text-left text-secondary-600 bg-white border rounded shadow-md mt-3 dropdown"
                            v-if="isDropdownOpen[slotProps.index]"
                          >
                            <a
                              class="block text-left pr-[0.5rem] pl-[1rem] py-1 ml-[0.5rem] mr-[0.5rem] whitespace-nowrap hover:text-white hover:bg-primary-500 hover:rounded"
                              title="Plus d'actions"
                              href="javascript:void(0);"
                              @click="
                                () => {
                                  slotProps.data.id;
                                  showUpdateModal = true;
                                  providers = slotProps.data;
                                }
                              "
                            >
                              Modifier
                            </a>
                            <a
                              class="block text-left pr-[0.5rem] pl-[1rem] py-1 ml-[0.5rem] mr-[0.5rem] whitespace-nowrap hover:text-white hover:bg-primary-500 hover:rounded"
                              title="Plus d'actions"
                              href="javascript:void(0);"
                              @click="deleteProduct(slotProps.data.id)"
                              aria-disabled="true"
                            >
                              Supprimer
                            </a>
                          </div>
                        </div>
                        <!-- Plus d'actions -->
                      </template>
                    </Column>

                    <template #footer>
                      Il y a
                      {{ providers ? providers.length : 0 }}
                      Provider(s) au total.
                    </template>
                  </DataTable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <ProviderModal
    v-if="showModal"
    :visible="showModal"
    :showModal="showModal"
    :closeModal="closeModal"
    @refreshProviders="updateList"
  ></ProviderModal>

  <!-- 
  <UpdateProductModal
    :providers="providers"
    v-if="showUpdateModal"
    :visible="showUpdateModal"
    :closeUpdateModal="closeUpdateModal"
  ></UpdateProductModal> -->
  <!-- @refreshVersion="updateList" -->
  <!-- :isUpdate="isUpdate" -->
</template>
