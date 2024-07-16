<script setup>
import { onMounted, ref } from "vue";
import useProducts from "@/services/products";
import DataTable from "primevue/datatable";
import Button from "primevue/button";
import TheSidebar from "@/components/partials/TheSidebar.vue";
import TheBanner from "@/components/partials/TheBanner.vue";
import TheHeaderNav from "@/components/partials/TheHeaderNav.vue";
import TheLottieLoader from "@/components/partials/TheLottieLoader.vue";
import Column from "primevue/column";

import ProductModal from "@/components/modals/Products/ProductModal.vue";
// import UpdateProductModal from "@/components/Parametres/Products/UpdateProductModal.vue";

const isDropdownOpen = ref([]);
const showMoreActions = (index) => {
  isDropdownOpen.value[index] = !isDropdownOpen.value[index];
};

const showModal = ref(false);
const showUpdateModal = ref(false);

const { products, isLoading, loading, getProducts } = useProducts();

const updateProductList = async () => {
  await getProducts();
};

onMounted(() => {
  getProducts();
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
        :pageTitle="`Produits`"
        page-description="Gestion des Produits"
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
              <!-- {{ Products }} -->
              <div class="overflow-x-auto">
                <div class="mt-6 overflow-x-auto">
                  <DataTable
                    :loading="loading"
                    dataKey="id"
                    ref="dt"
                    filterDisplay="menu"
                    :value="products"
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
                    <template #empty> Aucune Product </template>
                    <template #loading> Chargement... </template>

                    <Column header="Désignation">
                      <template #body="slotProps">
                        <td class="py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <h6
                              class="text-base capitalize truncate hover:text-clip"
                            >
                              {{ slotProps.data.designation }}
                            </h6>
                          </div>
                        </td>
                      </template>
                    </Column>

                    <Column header="Prix ">
                      <template #body="slotProps">
                        <td class="py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <h6
                              class="text-base capitalize truncate hover:text-clip"
                            >
                              {{ $filters.formatAmount(slotProps.data.price) ?? 0 }}
                            </h6>
                          </div>
                        </td>
                      </template>
                    </Column>

                    <Column header="Référence ">
                      <template #body="slotProps">
                        <td class="py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <h6
                              class="text-base capitalize truncate hover:text-clip"
                            >
                              {{ slotProps.data.internal_reference ?? 0 }}
                            </h6>
                          </div>
                        </td>
                      </template>
                    </Column>
                    
                    <Column header="Quantité en Stock ">
                      <template #body="slotProps">
                        <td class="py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <h6
                              class="text-base capitalize truncate hover:text-clip"
                            >
                              {{ slotProps.data.quantity_stock ?? 0 }}
                            </h6>
                          </div>
                        </td>
                      </template>
                    </Column>

                    <Column header="Code Barre">
                      <template #body="slotProps">
                        <td class="py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <h6
                              class="text-base capitalize truncate hover:text-clip"
                            >
                              <!-- {{ slotProps.data.barcode ?? 0 }} -->
                              <vue-barcode
                                :value="slotProps.data.barcode"
                              ></vue-barcode>
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

                    <template #footer>
                      Il y a
                      {{ products ? products.length : 0 }}
                      Product(s) au total.
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

  <ProductModal
    v-if="showModal"
    :visible="showModal"
    :showModal="showModal"
    :closeModal="closeModal"
    @refreshProducts="updateProductList"
  ></ProductModal>

  <!-- 

  <UpdateProductModal
    :products="products"
    v-if="showUpdateModal"
    :visible="showUpdateModal"
    :closeUpdateModal="closeUpdateModal"
  ></UpdateProductModal> -->
  <!-- @refreshVersion="updateVersions" -->
  <!-- :isUpdate="isUpdate" -->
</template>
