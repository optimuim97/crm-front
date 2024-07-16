import { ref } from "vue";
import axios from "axios";

export default function () {
  const purchaseOrders = ref([]);
  const invoices = ref([]);
  const error = ref();

  const loading = ref(false);
  const isLoading = ref(false);

  const getPurchaseOrders = async () => {
    isLoading.value = true;
    // loading.value = true;

    await axios
      .get("/purchase-orders")
      .then(({ data, status, code }) => {
        console.log(data);

        purchaseOrders.value = data.data;

        if (status == 200) {
          if (data?.status == 200) {
            purchaseOrders.value = data.data;
          }
        } else if (code == 500) {
          error.value = code;
          console.log(code);
        } else if (code == 401) {
          error.value = code;
          console.log(code);
        } else if (code == 404) {
          error.value = code;
          console.log(code);
        }
        isLoading.value = false;
        // loading.value = false;
      })
      .catch((e) => {
        console.log({ e: e });
        error.value = e;
      })
      .finally(() => {
        isLoading.value = false;
        // loading.value = false;
      });
  };

  const postPurchaseOrders = async (postedData) => {
    // console.log({ postedData: postedData });
    loading.value = true;
    postedData.provider_reference = postedData.provider?.reference;
    postedData.provider_id = postedData.provider?.id;

    await axios
      .post("/create-purchase-order", postedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data, status, code }) => {
        if (status == 200 || status == 201) {
          if (data?.status == 200 || status == 201) {
            purchaseOrders.value.push(data.data);
            console.log({ result: data.data });
          }
        } else if (code == 500) {
          error.value = code;
          console.log({ code: code });
        } else if (code == 401) {
          error.value = code;
          console.log({ code: code });
        } else if (code == 404) {
          error.value = code;
          console.log({ code: code });
        }
        isLoading.value = false;
        loading.value = false;
      })
      .catch((e) => {
        error.value = e;
        console.log({ error: e });
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const updatePurchaseOrders = async (postedData) => {
    loading.value = true;
    console.log({ postedData: postedData });

    await axios
      .post(`/update-purchaseOrder/${postedData.id}`, postedData)
      .then(({ data, status, code }) => {
        if (status == 200) {
          if (data?.status == 200) {
            purchaseOrders.value.push(data.data);
            console.log({ result: data.data });
          }
        } else if (code == 500) {
          error.value = code;
          console.log({ code: code });
        } else if (code == 401) {
          error.value = code;
          console.log({ code: code });
        } else if (code == 404) {
          error.value = code;
          console.log({ code: code });
        }
        isLoading.value = false;
        loading.value = false;
      })
      .catch((e) => {
        error.value = e;
        console.log({ error: e });
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const validatePurchaseOrders = async (orderNumber) => {
    loading.value = true;

    await axios
      .patch(`/update-purchase-order/${orderNumber}`)
      .then(({ data, status, code }) => {
        if (status == 200) {
          if (data?.status == 200) {
            purchaseOrders.value.push(data.data.order);
            invoices.value.push(data.data.invoice);

            return purchaseOrders;
          }
        } else if (code == 500) {
          error.value = code;
          console.log({ code: code });
        } else if (code == 401) {
          console.log({ code: code });
        } else if (code == 404) {
          console.log({ code: code });
        }
        isLoading.value = false;
        loading.value = false;
      })
      .catch((e) => {
        console.log({ error: e });
      })
      .finally(() => {
        loading.value = false;
      });
  };

  return {
  error,
    purchaseOrders,
    invoices,
    loading,
    isLoading,
    getPurchaseOrders,
    postPurchaseOrders,
    updatePurchaseOrders,
    validatePurchaseOrders,
  };
}
