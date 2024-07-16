<script setup>
import axios from "axios";
import { defineProps, ref, onMounted } from "vue";
import Dialog from "primevue/dialog";
import "vue3-toastify/dist/index.css";
import html2pdf from "html2pdf.js";
import useTransaction from "@/services/transactions";

const props = defineProps({
  quotation: Object,
  showModal: Boolean,
  closeModal: Function,
  customer: String,
});

const { postPayments, getPayments, paymentsMethods, loading } =
  useTransaction();

const table = ref(null);
const exportPDF = async () => {
  const tableWidth = table.value.clientWidth;
  const tableHeight = table.value.clientHeight;

  let filename = new Date();

  const options = {
    filename: `${props.quotation.quote_number}.pdf`,
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
      <h1>Dévis</h1>
      <!-- <p>Date d'édition : {{ formatDate(invoiceData.dateEdition) }}</p> -->
      <div class="flex-auto my-2">
        <p>
          Date de création : {{ $filters.formatDate(quotation.created_at) }}
        </p>
      </div>

      <div class="my-2">
        <p>
          Numéro dévis : #
          {{ quotation.quote_number }}
        </p>
      </div>

      <div class="my-2">
        <p>Clients : {{ customer }}</p>
      </div>

      <DataTable :value="quotation.products">
        <Column field="designation" header="Désignation"></Column>
        <Column field="pivot.quantity" header="Quantité"></Column>
        <Column field="price" header="Prix Unitaire"> </Column>
        <!-- <Column header="Montant Total" :body="calculateTotal"> </Column> -->
      </DataTable>

      <h2>Total : {{ $filters.formatAmount(quotation.total_amount) }}</h2>
    </div>

    <template #footer>
      <div class="flex justify-start">
        <div>
          <Button
            label="Fermer"
            icon="pi pi-times"
            @click="closeModal"
            text
            class="btn btn-outline-secondary waves-effect"
            style="color: #6d788d"
          />

          <button
            style="text-transform: none; height: 39px"
            class="btn btn-warning waves-effect waves-light"
            @click.prevent="exportPDF()"
          >
            <i class="pi pi-check"></i> Télécharger le pdf
          </button>
        </div>
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
