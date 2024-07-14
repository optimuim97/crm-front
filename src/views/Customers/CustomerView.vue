<script setup>
import { onMounted, ref } from "vue";
import useCustomers from "@/services/customers";
import DataTable from "primevue/datatable";
import Button from "primevue/button";
import TheSidebar from "@/components/partials/TheSidebar.vue";
import TheBanner from "@/components/partials/TheBanner.vue";
import TheHeaderNav from "@/components/partials/TheHeaderNav.vue";
import TheLottieLoader from "@/components/partials/TheLottieLoader.vue";
import Column from "primevue/column";

import CustomerModal from "@/components/modals/Customers/CustomerModal.vue";
// import UpdateProductModal from "@/components/Parametres/Customers/UpdateProductModal.vue";

const isDropdownOpen = ref([]);
const showMoreActions = (index) => {
  isDropdownOpen.value[index] = !isDropdownOpen.value[index];
};

const showModal = ref(false);
const showUpdateModal = ref(false);

const { customers, isLoading, loading, getCustomers } = useCustomers();

const updateList = async () => {
  await getCustomers();
};

onMounted(() => {
  getCustomers();
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
        :pageTitle="`Clients`"
        page-description="Gestion des Clients"
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
              <!-- {{ Customers }} -->
              <div class="overflow-x-auto">
                <div class="mt-6 overflow-x-auto">
                  <DataTable
                    :loading="loading"
                    dataKey="id"
                    ref="dt"
                    filterDisplay="menu"
                    :value="customers"
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
                    <template #empty> Aucune Customer </template>
                    <template #loading> Chargement... </template>

                    <Column header="Prénom">
                      <template #body="slotProps">
                        <td class="py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <h6
                              class="text-base capitalize truncate hover:text-clip"
                            >
                              {{ slotProps.data.first_name }}
                            </h6>
                          </div>
                        </td>
                      </template>
                    </Column>

                    <Column header="Nom ">
                      <template #body="slotProps">
                        <td class="py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <h6
                              class="text-base capitalize truncate hover:text-clip"
                            >
                              {{ slotProps.data.last_name ?? "-" }}
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
                              {{ slotProps.data.phone_number ?? "-" }}
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
                                  customers = slotProps.data;
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
                      {{ customers ? customers.length : 0 }}
                      Customer(s) au total.
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

  <CustomerModal
    v-if="showModal"
    :visible="showModal"
    :showModal="showModal"
    :closeModal="closeModal"
    @refreshCustomers="updateList"
  ></CustomerModal>

  <!-- 

  <UpdateProductModal
    :customers="customers"
    v-if="showUpdateModal"
    :visible="showUpdateModal"
    :closeUpdateModal="closeUpdateModal"
  ></UpdateProductModal> -->
  <!-- @refreshVersion="updateList" -->
  <!-- :isUpdate="isUpdate" -->
</template>
