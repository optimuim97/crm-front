<script setup>
import { onMounted, defineProps, ref } from "vue";
import useTransaction from "@/services/transactions";
import { toast } from "vue3-toastify";

const emit = defineEmits(["refresh"]);
const postData = {};

const { postPayments, getPayments, paymentsMethods, loading } =
  useTransaction();

const props = defineProps({
  totalAmount: Number,
  invoice: {
    type: Object,
    required: false,
  },
  purchaseOrder: {
    type: Object,
    required: false,
  },
  showModal: Boolean,
  closeModal: Function,
});

const processPayment = async () => {
  await postPayments(postData);
  // Reload

  emit("refresh");
  toast.success("Paiement éffectué");
  props.closeModal();
};

onMounted(async () => {
  await getPayments();
});
</script>

<template>
  <!-- Create Merchant Modal-->
  <Dialog
    modal
    header="Payer"
    position="center"
    :closable="false"
    :style="{ width: '30vw' }"
    maximizable
  >
    <div class="container mt-4">
      <div class="flex justify-center">
        <h1 class="flex justify-center">
          {{ props.totalAmount }}
        </h1>
      </div>

      <div>
        <div class="mb-4 flex items-center">
          <Dropdown
            v-model="postData.payment_method_id"
            :options="paymentsMethods"
            optionLabel="designation"
            class="w-full border"
            placeholder="Selectionner methode de paiements"
          >
          </Dropdown>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-start">
        <div>
          <Button
            label="Fermer"
            icon="pi pi-times"
            @click="closeModal()"
            text
            class="btn btn-outline-secondary waves-effect"
            style="color: #6d788d"
          />
          <Button
            label="Payer"
            style="text-transform: none; height: 50px"
            icon="pi pi-check"
            class="btn btn-primary waves-effect waves-light"
            autofocus
            :loading="loading"
            @click="processPayment"
          />
        </div>
      </div>
    </template>
  </Dialog>
  <!-- Create Merchant Modal-->
</template>

<style>
.p-togglebutton.p-highlight .p-button:hover {
  background: #3a57e8;
  border-color: #3a57e8;
  color: #fff;
  /*color: #708da9;*/
}

.p-togglebutton .p-button {
  background: #3a57e8;
  border: 1px solid #d3dbe3;
  color: #fff;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s,
    box-shadow 0.2s;
  outline-color: transparent;
}
</style>
