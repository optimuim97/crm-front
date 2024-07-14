<script setup>
import { computed, onMounted, ref, watch } from "vue";

import useProducts from "@/services/products";
import useProviders from "@/services/providers";

import DataTable from "primevue/datatable";
import Button from "primevue/button";
import TheSidebar from "@/components/partials/TheSidebar.vue";
import TheBanner from "@/components/partials/TheBanner.vue";
import TheHeaderNav from "@/components/partials/TheHeaderNav.vue";
import TheLottieLoader from "@/components/partials/TheLottieLoader.vue";
import Column from "primevue/column";

const postData = ref({});
const totalAmount = ref(0);

const handleChange = (event) => {
  totalAmount.value = calculateTotalAmount(event.value);
  console.log("Selected products:", event.value);
};
const { products, isLoading, loading, getProducts } = useProducts();
const { providers, getProviders } = useProviders();

const updateProductList = async () => {
  await getProducts();
};

function calculateTotalAmount(items) {
  return items.reduce((total, item) => {
    const quantity = item.quantity || 0;
    const price = item.price || 0;
    return total + quantity * price;
  }, 0);
}

// Watch for changes in postData.products and recalculate totalAmount
watch(() => postData.value.products, (newProducts) => {
  totalAmount.value = calculateTotalAmount(newProducts);
}, { deep: true });

onMounted(async () => {
  await getProducts();
  await getProviders();
});
</script>

<template>
  <!--Nav Start-->
  <TheSidebar></TheSidebar>

  <main class="main-content">
    <div class="relative">
      <TheBanner></TheBanner>
      <!--Nav Start-->
      <TheHeaderNav
        :pageTitle="`Création de Bon de commandes`"
        page-description="Gestion des Clients"
      ></TheHeaderNav>
      <!-- Nav Header Component End -->
      <!--Nav End-->
    </div>

    <div class="container mx-auto p-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Première partie avec Dropdown et MultiSelect -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold mb-4">Sélection</h2>

          <div class="mb-4 flex items-center">
            <Dropdown
              v-model="postData.provider"
              :options="providers"
              optionLabel="name"
              class="w-full border"
              placeholder="Selectionner Fournisseur"
              filter
            >
              <template #option="slotProps">
                <div>
                  <p>
                    {{ slotProps.option.name }}
                  </p>
                  <p>
                    {{ slotProps.option.email }}
                  </p>
                </div>
              </template>
            </Dropdown>
            <button
              class="ml-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              <i class="pi pi-plus"></i>
            </button>
          </div>

          <div class="flex items-center">
            <!-- <label
              for="multiselect"
              class="block text-sm font-medium text-gray-700 mr-4"
              >Choisissez les produits :</label
            > -->
            <MultiSelect
              v-model="postData.products"
              :options="products"
              optionLabel="designation"
              class="w-full border"
              placeholder="Selectionner Produits"
              @change="handleChange"
              filter
              display="chip"
              filterPlaceholder="Rechercher un produit"
              removable
            />
            <button
              class="ml-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              <i class="pi pi-plus"></i>
            </button>
          </div>
        </div>

        <!-- Deuxième partie avec liste de produits et montant total -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold mb-4">Produits</h2>
          <ul class="list-disc pl-5 mb-4">
            <li
              class="flex items-center mb-2"
              v-for="(product, index) in postData.products"
              :key="index"
            >
              {{ product.designation }} -
              {{ $filters.formatAmount(product.price) }} (Quantité:
              <!-- {{ product.quantity }} -->

              )
              <input
                type="number"
                v-model="product.quantity"
                min="1"
                class="block w-1/4 font-bold text-2sm px-4 py-2 placeholder-secondary-400 dark:bg-dark-card dark:border-secondary-500 bg-white border rounded outline-none focus:border-primary-500 dark:focus:border-primary-500 focus:shadow"
              />
            </li>
          </ul>
          <div class="text-xl font-bold">
            Montant Total: {{ $filters.formatAmount(totalAmount) }}
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
