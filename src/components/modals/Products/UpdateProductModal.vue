<script setup>
import { defineProps, onMounted, ref } from "vue";
import useProducts from "@/services/products";

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

const { updateProducts, loading } = useProducts();

const props = defineProps({
  Product: {
    type: Object,
    required: true,
  },
  showModal: Boolean,
  closeUpdateModal: Function,
});

onMounted(() => {
  postData.value = props.Product;
});
</script>

<template>
  <!-- Create Merchant Modal-->
  <Dialog
    modal
    header="Modifier"
    position="center"
    :closable="false"
    :style="{ width: '30vw' }"
    maximizable
  >
    <div class="container mt-4">
      <form>
        <div class="my-2">
          <div class="flex flex-column h-12rem">
            <div
              class="surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium"
            >
              <div class="flex justify-center w-full mb-4">
                <img
                  v-if="previewImageRecto"
                  :src="previewImageRecto"
                  class="w-90 h-40"
                  alt="profile-pic"
                />
              </div>
            </div>
          </div>

          <div class="flex-auto">
            <label class="inline-block mb-2 text-secondary-600" for="lname">
              Logo (.jpg, .png, .jpeg)</label
            >
            <input
              type="file"
              id="fileupload1"
              accept="image/*"
              @change="uploadImage"
              class="block choose w-full text-xl border dark:border-secondary-800 dark:bg-dark-card text-secondary-500 rounded outline-none focus:border-primary-400 focus:shadow"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="flex-auto">
            <label class="inline-block mb-2 text-secondary-600" for="lname">
              Désignation
            </label>
            <input
              v-model="props.Product.designation"
              type="text"
              class="block w-full font-bold text-2xl px-4 py-2 placeholder-secondary-400 dark:bg-dark-card dark:border-secondary-500 bg-white border rounded outline-none focus:border-primary-500 dark:focus:border-primary-500 focus:shadow"
            />
          </div>

          <div class="flex-auto">
            <label class="inline-block mb-2 text-secondary-600" for="lname">
              Code
            </label>
            <input
              v-model="props.Product.code"
              type="text"
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
            @click="closeUpdateModal()"
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
            @click="
              async () => {
                await updateProducts(props.Product);
                props.closeUpdateModal();
              }
            "
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
