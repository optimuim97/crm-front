import { ref } from "vue";
import axios from "axios";

export default function () {
  const quotations = ref([]);
  const error = ref([]);

  const loading = ref(false);
  const isLoading = ref(false);

  const getQuotations = async () => {
    isLoading.value = true;
    // loading.value = true;

    await axios
      .get("/quotations")
      .then(({ data, status, code }) => {
        console.log(data);
        quotations.value = data.data;

        if (status == 200) {
          if (data?.status == 200) {
            quotations.value = data.data;
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
        error.value = e;
        console.log({ e: e });
      })
      .finally(() => {
        isLoading.value = false;
        // loading.value = false;
      });
  };

  const postQuotation = async (postedData) => {
    loading.value = true;
    postedData.customer_id = postedData.customer.id;

    await axios
      .post("/create-quotation", postedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data, status, code }) => {
        if (status == 200 || status == 201) {
          if (data?.status == 200 || status == 201) {
            quotations.value.push(data.data);
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

  const updateQuotation = async (postedData) => {
    loading.value = true;
    console.log({ postedData: postedData });

    await axios
      .post(`/update-purchaseOrder/${postedData.id}`, postedData)
      .then(({ data, status, code }) => {
        if (status == 200) {
          if (data?.status == 200) {
            error.value = code;
            quotations.value.push(data.data);
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

  const validateQuotation = async (orderNumber) => {
    loading.value = true;

    await axios
      .post(`/confirm-quotation/${orderNumber}`)
      .then(({ data, status, code }) => {
        if (status == 200) {
          if (data?.status == 200) {
            quotations.value.push(data.data.order);
          }
        } else if (code == 500) {
          console.log({ code: code });

          error.value = code;
          console.log(error);
        } else if (code == 401) {
          console.log({ code: code });
          error.value = code;
          console.log(error);
        } else if (code == 404) {
          console.log({ code: code });
          error.value = code;
          console.log(error);
        }
        isLoading.value = false;
        loading.value = false;
      })
      .catch((e) => {
        console.log({ error: e });

        error.value = e;
        console.log(e);
      })
      .finally(() => {
        loading.value = false;
      });
  };

  return {
    error,
    quotations,
    loading,
    isLoading,
    getQuotations,
    postQuotation,
    updateQuotation,
    validateQuotation,
  };
}
