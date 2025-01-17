<script setup>
import { computed, onMounted, ref, watch } from "vue";

import useTransaction from "@/services/transactions";
import useProducts from "@/services/products";
import useProviders from "@/services/providers";
import useInvoice from "@/services/invoices";
import usePurchaseOrders from "@/services/purchaseOrders";
import { toast } from "vue3-toastify";
import DataTable from "primevue/datatable";
import Button from "primevue/button";
import TheSidebar from "@/components/partials/TheSidebar.vue";
import TheBanner from "@/components/partials/TheBanner.vue";
import TheHeaderNav from "@/components/partials/TheHeaderNav.vue";
import TheLottieLoader from "@/components/partials/TheLottieLoader.vue";
import Column from "primevue/column";

// Modal
import PaymentModal from "@/components/modals/PaymentModal.vue";
import InvoiceModal from "@/components/modals/Invoices/InvoiceModal.vue";
import PurchasOrderModal from "@/components/modals/PurchaseOrders/PurchasOrderModal.vue";

const postData = ref({});
const totalAmount = ref(0);

// API calls
const { products, isLoading, loading, getProducts } = useProducts();
const { providers, getProviders } = useProviders();
const { postPayments, paymentsMethods, getPayments } = useTransaction();

const { invoice, getInvoice } = useInvoice();

const {
  error,
  invoices,
  purchaseOrders,
  postPurchaseOrders,
  getPurchaseOrders,
  validatePurchaseOrders,
} = usePurchaseOrders();

const addPurchaseOrder = async () => {
  await postPurchaseOrders(postData.value);
  // Reload Purchase Order
  await getPurchaseOrders();

  if (!error.value) {
    toast.success("Bon de commande créer");
    postData.value = {};
  }
};

const validerCommande = async (orderNumber) => {
  await validatePurchaseOrders(orderNumber);
  await getPurchaseOrders();

  toast.success("Commande Validé");
  postData.value = {};
};

const updateProductList = async () => {
  await getProducts();
};

function calculateTotalAmount(items) {
  return (
    items?.reduce((total, item) => {
      const quantity = item.quantity || 0;
      const price = item.price || 0;
      return total + quantity * price;
    }, 0) ?? 0
  );
}
// API calls End

//Handle Error
watch(error, (newValue) => {
  if (newValue) {
    toast.error(newValue.response.data.message ?? "Une erreur est survenue");
  }
});

// Watch for changes in postData.products and recalculate totalAmount
watch(
  () => postData.value.products,
  (newProducts) => {
    totalAmount.value = calculateTotalAmount(newProducts);
    postData.value.total_amount = totalAmount.value;
  },
  { deep: true }
);

onMounted(async () => {
  await getPurchaseOrders();
  await getProducts();
  await getProviders();
  await getPayments();
});

//handle Action Button
const isDropdownOpen = ref([]);
const showMoreActions = (index) => {
  isDropdownOpen.value[index] = !isDropdownOpen.value[index];
};

// Transaction Modal Action
const showModal = ref();
const showModal_ = () => {
  showModal.value = true;
};
const closeModal = () => {
  showModal.value = false;
};
// Invoice Modal Action

// Invoice Modal Action
const showInvoiceModal = ref(false);
const showInvoice = async (invoice_number) => {
  await getInvoice(invoice_number);
  showInvoiceModal.value = true;
};
const closeInvoiceModal = () => {
  showInvoiceModal.value = false;
};
// Invoice Modal Action

// PurchaseOrder Modal Action
const showPurchaseOrderModal = ref(false);
const providerData = ref();
const showPurchaseOrder = async (invoice_number, provider) => {
  await getInvoice(invoice_number);
  showPurchaseOrderModal.value = true;
  providerData.value = provider;
};
const closePurchaseModal = () => {
  showPurchaseOrderModal.value = false;
};
// PurchaseOrder Modal Action

const handleChange = (event) => {
  totalAmount.value = calculateTotalAmount(event.value);
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
            <router-link to="providers">
              <button
                class="ml-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                <i class="pi pi-plus"></i>
              </button>
            </router-link>
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

            <router-link to="products">
              <button
                class="ml-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                <i class="pi pi-plus"></i>
              </button>
            </router-link>
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
                required
                type="number"
                v-model="product.quantity"
                min="1"
                class="block w-1/4 font-bold text-2sm px-4 py-2 placeholder-secondary-400 dark:bg-dark-card dark:border-secondary-500 bg-white border rounded outline-none focus:border-primary-500 dark:focus:border-primary-500 focus:shadow"
              />
            </li>
          </ul>
          <div class="text-xl font-bold">
            <!-- {{ paymentsMethods }} -->

            Montant Total: {{ $filters.formatAmount(totalAmount) }}
          </div>
        </div>
      </div>

      <!-- <p>
        {{ postData }}
      </p> -->

      <div class="flex justify-end my-2">
        <Button
          class="btn btn-primary mr-3"
          label="Soumettre"
          icon="pi pi-check"
          :loading="loading"
          @click="addPurchaseOrder"
        />
      </div>
    </div>

    <div class="container mx-auto p-4">
      <div class="overflow-x-auto">
        <div class="mt-6 overflow-x-auto">
          <!-- {{ purchaseOrders }} -->

          <DataTable
            :loading="loading"
            dataKey="id"
            ref="dt"
            filterDisplay="menu"
            :value="purchaseOrders"
            paginator
            :rows="5"
            tableStyle="min-width: 50rem"
          >
            <template #header>
              <div class="flex justify-between">
                <div class="flex justify-start gap-2"></div>
              </div>
            </template>
            <template #empty> Aucune Commande </template>
            <template #loading> Chargement... </template>

            <Column header="Fournisseur">
              <template #body="slotProps">
                <td class="py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <h6 class="text-base capitalize truncate hover:text-clip">
                      {{ slotProps.data.name }}
                    </h6>
                  </div>
                  <h6 class="text-base truncate hover:text-clip">
                    {{ slotProps.data.phone_number }}
                  </h6>
                </td>
              </template>
            </Column>

            <Column header=" # Numéro Commande ">
              <template #body="slotProps">
                <td class="py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <h6 class="text-base capitalize truncate hover:text-clip">
                      {{ slotProps.data.order_number ?? "-" }}
                    </h6>
                  </div>
                </td>
              </template>
            </Column>

            <Column header="Montant Total ">
              <template #body="slotProps">
                <td class="py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <h6 class="text-base capitalize truncate hover:text-clip">
                      {{
                        $filters.formatAmount(slotProps.data.total_amount) ?? 0
                      }}
                    </h6>
                  </div>
                </td>
              </template>
            </Column>

            <Column header="Statut">
              <template #body="slotProps">
                <td class="py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <h6 class="text-basetruncate hover:text-clip">
                      <Tag
                        severity="success"
                        value="Validé"
                        v-if="slotProps.data.is_valided"
                      ></Tag>

                      <Tag severity="warning" value="En attente" v-else></Tag>
                    </h6>
                  </div>
                </td>
              </template>
            </Column>

            <Column header="Date de Création">
              <template #body="slotProps">
                <td class="py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <h6 class="text-base capitalize truncate hover:text-clip">
                      {{ $filters.formatDate(slotProps.data.created_at) }}
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
                      v-if="slotProps.data.is_valided != true"
                      @click="validerCommande(slotProps.data.order_number)"
                    >
                      Valider
                    </a>

                    <a
                      v-if="slotProps.data.is_valided"
                      class="block text-left pr-[0.5rem] pl-[1rem] py-1 ml-[0.5rem] mr-[0.5rem] whitespace-nowrap hover:text-white hover:bg-primary-500 hover:rounded"
                      title="Plus d'actions"
                      href="javascript:void(0);"
                      @click="
                        showInvoice(slotProps.data.invoice.invoice_number)
                      "
                    >
                      Facture
                    </a>

                    <a
                      class="block text-left pr-[0.5rem] pl-[1rem] py-1 ml-[0.5rem] mr-[0.5rem] whitespace-nowrap hover:text-white hover:bg-primary-500 hover:rounded"
                      title="Plus d'actions"
                      href="javascript:void(0);"
                      @click="
                        showPurchaseOrder(
                          slotProps.data.invoice.invoice_number,
                          slotProps.data
                        )
                      "
                    >
                      Bon De Commande
                    </a>
                  </div>
                </div>
                <!-- Plus d'actions -->
              </template>
            </Column>

            <template #footer>
              Il y a
              {{ purchaseOrders ? purchaseOrders.length : 0 }}
              Bon de Commande(s) au total.
            </template>
          </DataTable>
        </div>
      </div>
    </div>
  </main>

  <!-- <PaymentModal
    :visible="showModal"
    :totalAmount="totalAmount"
    :invoice="invoices"
    :showModal="showModal"
    :closeModal="closeModal"
  >
  </PaymentModal> -->

  <InvoiceModal
    :paymentsMethods="paymentsMethods"
    :visible="showInvoiceModal"
    :invoice="invoice"
    :showModal="showInvoiceModal"
    :closeModal="closeInvoiceModal"
  >
  </InvoiceModal>

  <PurchasOrderModal
    :visible="showPurchaseOrderModal"
    :invoice="invoice"
    :showModal="showPurchaseOrderModal"
    :closeModal="closePurchaseModal"
    :provider="providerData"
  >
  </PurchasOrderModal>
</template>
