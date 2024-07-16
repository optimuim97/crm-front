<script setup>
import axios from "axios";
import { defineProps, ref, onMounted, watch } from "vue";
import Dialog from "primevue/dialog";
import html2pdf from "html2pdf.js";
import useTransaction from "@/services/transactions";
import usePurchaseOrders from "@/services/purchaseOrders";
import { toast } from "vue3-toastify";

const props = defineProps({
  invoice: Object,
  paymentsMethods: Object,
  closeModal: Function,
});

const table = ref(null);
onMounted(() => {});

const calculateTotal = (rowData) => {
  return rowData.price;
};

// Download PDF
const exportPDF = async () => {
  const tableWidth = table.value.clientWidth;
  const tableHeight = table.value.clientHeight;

  let filename = new Date();

  const options = {
    filename: `${props.invoice.invoice_number}.pdf`,
    image: { type: "jpeg", quality: 1 },
    html2canvas: {
      scale: 10, // Increase scale to improve image quality
      useCORS: true, // Enable cross-origin resource sharing
      logging: true, // Enable logging for troubleshooting
    },
    jsPDF: {
      unit: "pt",
      format: [tableWidth, tableHeight],
      orientation: "portrait",
    },
    margin: [20, 30, 0, 30],
  };

  // Call html2pdf function with options
  html2pdf().from(table.value).set(options).save();
};

const { error, postPayments, postCustomerPayments, getPayments, paymentsMethods, loading } =
  useTransaction();
const { invoices, getPurchaseOrders } = usePurchaseOrders();

//Handle Error
watch(error, (newValue) => {
  if (newValue) {
    toast.error(newValue.response.data.message ?? "Une erreur est survenue");
  }
});

const postData = ref({});
const payer = async () => {
  postData.value.invoiceNumber = props.invoice.invoice.invoice_number;
  console.log(postData.value);

  await postCustomerPayments(postData.value);
  if (!error.value) {
    toast.success("Paiement éffectué");
    postData.value = {};

    props.closeModal();
    getPurchaseOrders();
  }
};
</script>

<template>
  <!-- Create Modal-->
  <Dialog
    modal
    header=""
    position="top"
    :closable="false"
    :style="{ width: '50vw' }"
    maximizable
  >
    <div class="invoice" ref="table">
      <h1>Facture Clients</h1>
      <!-- <p>Date d'édition : {{ formatDate(invoiceData.dateEdition) }}</p> -->
      <div class="flex-auto my-2">
        <p>Date de création : {{ $filters.formatDate(invoice.created_at) }}</p>
      </div>

      <div class="my-2">
        <p>Numéro de la facture : # {{ invoice.invoice_number }}</p>
      </div>

      <div class="my-2">
        <p>Status : {{ invoice.is_paid ? "Payé" : "Non Payé" }}</p>
      </div>

      <DataTable :value="invoice.products">
        <Column field="designation" header="Désignation"></Column>
        <Column field="pivot.quantity" header="Quantité"></Column>
        <Column field="price" header="Prix Unitaire"> </Column>
        <!-- <Column header="Montant Total" :body="calculateTotal"> </Column> -->
      </DataTable>

      <h2>Total : {{ $filters.formatAmount(invoice.total_amount) }}</h2>

      <!-- {{ invoice.invoice.invoice_number ?? '------------------' }} -->
      <!-- {{ postData }} -->
      <div>
        <div class="mb-4 flex items-center" v-if="!invoice.invoice.is_paid">
          <Dropdown
            v-model="postData.payment_method"
            :options="props.paymentsMethods"
            optionLabel="designation"
            class="w-full border"
            placeholder="Selectionner methode de paiements"
          >
          </Dropdown>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-start gap-3">
        <Button
          label="Fermer"
          icon="pi pi-times"
          @click="closeModal"
          text
          class="btn btn-outline-secondary waves-effect"
          style="color: #6d788d"
        />

        <Button
          label="Télécharger le pdf"
          icon="pi pi-check"
          style="text-transform: none; height: 39px"
          class="btn btn-warning waves-effect waves-light"
          @click.prevent="exportPDF()"
          :loading="loading"
        />

        <!-- {{ props?.invoice.invoice_number }} -->

        <Button
          v-if="!invoice.is_paid"
          label="Payer"
          icon="pi pi-check"
          style="text-transform: none; height: 39px"
          class="btn btn-primary waves-effect waves-light"
          :loading="loading"
          @click.prevent="payer(postData)"
        />
      </div>
    </template>
  </Dialog>
  <!-- Create Modal-->
</template>

<style scoped>
.input--error {
  border-color: red;
}
</style>
