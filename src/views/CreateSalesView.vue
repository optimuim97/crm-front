<script setup>
import { computed, onMounted, ref, watch } from "vue";

import useTransaction from "@/services/transactions";
import useProducts from "@/services/products";
import useCustomers from "@/services/customers";
import useInvoice from "@/services/invoices";
import useQuotation from "@/services/quotations";
import { toast } from "vue3-toastify";
import DataTable from "primevue/datatable";
import Button from "primevue/button";
import TheSidebar from "@/components/partials/TheSidebar.vue";
import TheBanner from "@/components/partials/TheBanner.vue";
import TheHeaderNav from "@/components/partials/TheHeaderNav.vue";
import TheLottieLoader from "@/components/partials/TheLottieLoader.vue";
import Column from "primevue/column";

// Modal
// import PaymentModal from "@/components/modals/PaymentModal.vue";
import InvoiceCustomerModal from "@/components/modals/Invoices/InvoiceCustomerModal.vue";
import QuotationModal from "@/components/modals/Quotations/QuotationModal.vue";

const postData = ref({});
const totalAmount = ref(0);

// API calls
const { products, isLoading, loading, getProducts } = useProducts();
const { customers, getCustomers } = useCustomers();
const { postPayments, paymentsMethods, getPayments } = useTransaction();
const { invoice, getInvoice } = useInvoice();

const {
  error,
  quotations,
  invoices,
  purchaseOrders,
  postQuotation,
  getQuotations,
  validateQuotation,
} = useQuotation();

const addQuotation = async () => {
  // filterProduct 
  postData.value.products = postData.value.products.filter((product) => product.quantity_stock > 0);

  await postQuotation(postData.value);
  // Reload Purchase Order
  await getQuotations();

  if (!error.value.code) {
    toast.success("Dévis Ajouté");
    postData.value = {};
  }
};

const validerDevis = async (orderNumber) => {
  await validateQuotation(orderNumber);
  await getQuotations();

  if (!error.value.code) {
    toast.success("Dévis Validé");
    postData.value = {};
  }
};

const updateProductList = async () => {
  await getProducts();
};

function calculateTotalAmount(items) {
  return (
    items?.reduce((total, item) => {
      if (item.quantity > item.quantity_stock) {
        toast.error("Quantité en stock insuffisante");
      } else {
        const quantity = item.quantity || 0;
        const price = item.price || 0;
        return total + quantity * price;
      }
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
  await getQuotations();
  await getProducts();
  await getCustomers();
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
const showInvoice = async (data) => {
  console.log({ invoiceData: data });
  invoice.value = data;
  // await getInvoice(invoice_number);
  showInvoiceModal.value = true;
};
const closeInvoiceModal = () => {
  showInvoiceModal.value = false;
};
// Invoice Modal Action

// Quotation Modal Action
const showQuotationModal = ref(false);
const customerData = ref();
const quotation = ref();

const showQuotation = async (quote, customer_fullname) => {
  // await getInvoice(invoice_number);
  showQuotationModal.value = true;
  customerData.value = customer_fullname;
  quotation.value = quote;
};
const closeQuotationModal = () => {
  showQuotationModal.value = false;
};
// Quotation Modal Action

const handleChange = (event) => {
  if (event.value.quantity_stock > 0) {
    totalAmount.value = calculateTotalAmount(event.value);
  }
  if (event.value.quantity_stock == 0) {
    console.log(">>>>>> Olala");
    return false;
  }
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
        :pageTitle="`Ventes`"
        page-description="Gestion des Ventes"
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
              v-model="postData.customer"
              :options="customers"
              optionLabel="first_name"
              class="w-full border"
              placeholder="Selectionner Clients"
              filter
            >
              <template #option="slotProps">
                <div>
                  <p>
                    {{ slotProps.option.first_name }}
                  </p>
                  <p>
                    {{ slotProps.option.last_name }}
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
              <!-- {{ product.quantity_stock }} -->

              )
              <input
                required
                type="number"
                v-model="product.quantity"
                v-if="product.quantity_stock > 0"
                min="1"
                :disabled="product.quantity_stock == product.quantity"
                class="block w-1/4 font-bold text-2sm px-4 py-2 placeholder-secondary-400 dark:bg-dark-card dark:border-secondary-500 bg-white border rounded outline-none focus:border-primary-500 dark:focus:border-primary-500 focus:shadow mr-2"
              />

              <span v-if="product.quantity_stock > 0">
                Quantité en Stock
                <Tag>
                  {{ product.quantity_stock - product.quantity }}
                </Tag>
              </span>

              <span v-else> </span>
            </li>
          </ul>
          <div class="text-xl font-bold">
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
          @click="addQuotation"
        />
      </div>
    </div>

    <div class="container mx-auto p-4">
      <div class="overflow-x-auto">
        <div class="mt-6 overflow-x-auto">
          <DataTable
            :loading="loading"
            dataKey="id"
            ref="dt"
            filterDisplay="menu"
            :value="quotations"
            paginator
            :rows="5"
            tableStyle="min-width: 50rem"
          >
            <template #header>
              <div class="flex justify-between">
                <div class="flex justify-start gap-2"></div>
              </div>
            </template>
            <template #empty> Aucune Dévis </template>
            <template #loading> Chargement... </template>

            <Column header="Client">
              <template #body="slotProps">
                <td class="py-4 whitespace-nowrap">
                  <h6 class="text-base truncate hover:text-clip">
                    {{ slotProps.data?.customer_fullname ?? "-" }}
                  </h6>
                </td>
              </template>
            </Column>

            <Column header=" # Numéro Dévis ">
              <template #body="slotProps">
                <td class="py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <h6 class="text-base capitalize truncate hover:text-clip">
                      {{ slotProps.data.quote_number ?? "-" }}
                    </h6>
                  </div>
                </td>
              </template>
            </Column>

            <Column header="Montant Total ">
              <template #body="slotProps">
                <td class="py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <h6 class="text-base truncate hover:text-clip">
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
                        v-if="slotProps.data.confirmed"
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
                      v-if="!slotProps.data.confirmed"
                      @click="validerDevis(slotProps.data.quote_number)"
                    >
                      Valider
                    </a>

                    <a
                      v-if="slotProps.data.confirmed"
                      class="block text-left pr-[0.5rem] pl-[1rem] py-1 ml-[0.5rem] mr-[0.5rem] whitespace-nowrap hover:text-white hover:bg-primary-500 hover:rounded"
                      title="Plus d'actions"
                      href="javascript:void(0);"
                      @click="showInvoice(slotProps.data)"
                    >
                      Facture
                    </a>

                    <a
                      class="block text-left pr-[0.5rem] pl-[1rem] py-1 ml-[0.5rem] mr-[0.5rem] whitespace-nowrap hover:text-white hover:bg-primary-500 hover:rounded"
                      title="Plus d'actions"
                      href="javascript:void(0);"
                      @click="
                        showQuotation(
                          slotProps.data,
                          slotProps.data.customer_fullname
                        )
                      "
                    >
                      Dévis
                    </a>
                  </div>
                </div>
                <!-- Plus d'actions -->
              </template>
            </Column>

            <template #footer>
              Il y a
              {{ quotations ? quotations.length : 0 }}
              élément(s) au total.
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

  <InvoiceCustomerModal
    :visible="showInvoiceModal"
    :invoice="invoice"
    :showModal="showInvoiceModal"
    :closeModal="closeInvoiceModal"
    :paymentsMethods="paymentsMethods"
  >
  </InvoiceCustomerModal>

  <QuotationModal
    :visible="showQuotationModal"
    :quotation="quotation"
    :showModal="showQuotationModal"
    :closeModal="closeQuotationModal"
    :customer="customerData"
  >
  </QuotationModal>
</template>
