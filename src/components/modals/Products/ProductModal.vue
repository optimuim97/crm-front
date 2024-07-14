<script setup>
import { onMounted, defineProps, ref } from "vue";
import useProducts from "@/services/products";
import { toast } from "vue3-toastify";


const emit = defineEmits(["refreshProducts"]);
const previewImageRecto = ref();
const postData = {};

const uploadImage = (e) => {
  const image = e.target.files[0];
  const reader = new FileReader();

  postData.logo = image;

  reader.readAsDataURL(image);
  reader.onload = (e) => {
    previewImageRecto.value = e.target.result;
    console.log(previewImageRecto.value);
  };
};

const { getProducts, postProducts, loading } = useProducts();

function randomInt() {
    const rand = Math.floor(Math.random() * 10000000000);
    return rand;
}


const props = defineProps({
  showModal: Boolean,
  closeModal: Function,
});

const addProduct = async () => {
  await postProducts(postData);

  // Reload Bank
  await getProducts();

  emit('refreshProducts')
  toast.success("Produit Ajouté");
  props.closeModal();
};

onMounted(() => {
  postData.barcode = randomInt();
});
</script>

<template>
  <!-- Create Merchant Modal-->
  <Dialog
    modal
    header="Ajouter"
    position="center"
    :closable="false"
    :style="{ width: '30vw' }"
    maximizable
  >
    <div class="container mt-4">
      <form>
        <div class="grid grid-cols-2 gap-4">
          <div class="flex-auto">
            <label class="inline-block mb-2 text-secondary-600" for="lname">
              Désignation
            </label>
            <input
              v-model="postData.designation"
              type="text"
              class="block w-full font-bold text-2xl px-4 py-2 placeholder-secondary-400 dark:bg-dark-card dark:border-secondary-500 bg-white border rounded outline-none focus:border-primary-500 dark:focus:border-primary-500 focus:shadow"
            />
          </div>

          <div class="flex-auto">
            <label class="inline-block mb-2 text-secondary-600" for="lname">
              Prix
            </label>
            <input
              v-model="postData.price"
              type="text"
              class="block w-full font-bold text-2xl px-4 py-2 placeholder-secondary-400 dark:bg-dark-card dark:border-secondary-500 bg-white border rounded outline-none focus:border-primary-500 dark:focus:border-primary-500 focus:shadow"
            />
          </div>
          <div class="flex-auto">
            <label class="inline-block mb-2 text-secondary-600" for="lname">
              Code Barre
            </label>
            <input
              disabled
              v-model="postData.barcode"
              type="text"
              class="block w-full font-bold text-2xl px-4 py-2 placeholder-secondary-400 dark:bg-dark-card dark:border-secondary-500 bg-white border rounded outline-none focus:border-primary-500 dark:focus:border-primary-500 focus:shadow"
            />
          </div>
          <div class="flex-auto">
            <label class="inline-block mb-2 text-secondary-600" for="lname">
              Quantité
            </label>
            <input
              disabled
              v-model="postData.quantity"
              type="number"
              class="block w-full font-bold text-2xl px-4 py-2 placeholder-secondary-400 dark:bg-dark-card dark:border-secondary-500 bg-white border rounded outline-none focus:border-primary-500 dark:focus:border-primary-500 focus:shadow"
            />
          </div>
        </div>
      </form>
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
            label="Enregistrer"
            style="text-transform: none; height: 50px"
            icon="pi pi-check"
            class="btn btn-primary waves-effect waves-light"
            autofocus
            :loading="loading"
            @click="addProduct"
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
