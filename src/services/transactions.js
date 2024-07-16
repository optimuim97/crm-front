import { ref } from "vue";
import axios from "axios";

export default function () {
  const transactions = ref([]);
  const error = ref();

  const loading = ref(false);
  const isLoading = ref(false);
  const paymentsMethods = ref([]);

  const postPayments = async (postedData) => {
    postedData.payment_method;
    // console.log({ postedData: postedData });
    loading.value = true;

    await axios
      .post(`/create-transaction/${postedData.invoiceNumber}`, postedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data, status, code }) => {
        if (status == 200 || status == 201) {
          if (data?.status == 200 || status == 201) {
            transactions.value.push(data.data);
            console.log({ result: data.data });
            // transactions.value = data.data;
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

  const postCustomerPayments = async (postedData) => {
    postedData.payment_method;
    loading.value = true;

    await axios
      .post(
        `/create-customer-transaction/${postedData.invoiceNumber}`,
        postedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(({ data, status, code }) => {
        if (status == 200 || status == 201) {
          if (data?.status == 200 || status == 201) {
            transactions.value.push(data.data);
            console.log({ result: data.data });
            // transactions.value = data.data;
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

  const getPayments = async (postedData) => {
    await axios
      .get("/get-payments-methods")
      .then(({ data, status, code }) => {
        paymentsMethods.value = data.data;

        if (status == 200 || status == 201) {
          if (data?.status == 200 || status == 201) {
            paymentsMethods.value = data.data;
            console.log({ paymentsMethods: data.data });
            // transactions.value = data.data;
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

  return {
    error,
    transactions,
    loading,
    isLoading,
    getPayments,
    postPayments,
    paymentsMethods,
    postCustomerPayments,
  };
}
