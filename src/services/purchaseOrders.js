import { ref } from "vue";
import axios from "axios";

export default function () {
  const purchaseOrders = ref([]);

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
          }
        } else if (code == 500) {
          console.log(code);
        } else if (code == 401) {
          console.log(code);
        } else if (code == 404) {
          console.log(code);
        }
        isLoading.value = false;
        // loading.value = false;
      })
      .catch((e) => {
        console.log({ e: e });
      })
      .finally(() => {
        isLoading.value = false;
        // loading.value = false;
      });
  };

  const postPurchaseOrders = async (postedData) => {
    // console.log({ postedData: postedData });
    loading.value = true;
    postedData.provider_reference = postedData.provider.reference;
    postedData.provider_id = postedData.provider.id;

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
            // purchaseOrders.value = data.data;
          }
        } else if (code == 500) {
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

  const validatePurchaseOrders = async (postedData) => {
    loading.value = true;
    console.log({ postedData: postedData });

    await axios
      .patch(`/update-purchase-order/${postedData.order_number}`)
      .then(({ data, status, code }) => {
        if (status == 200) {
          if (data?.status == 200) {
            purchaseOrders.value.push(data.data);
            console.log({ result: data.data });
          }
        } else if (code == 500) {
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
    purchaseOrders,
    loading,
    isLoading,
    getPurchaseOrders,
    postPurchaseOrders,
    updatePurchaseOrders,
    validatePurchaseOrders,
  };
}
