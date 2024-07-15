import { ref } from "vue";
import axios from "axios";

export default function () {
  const transactions = ref([]);

  const loading = ref(false);
  const isLoading = ref(false);
  const paymentsMethods = ref([]);

  //   const getPayments = async () => {
  //     isLoading.value = true;
  //     // loading.value = true;

  //     await axios
  //       .get("/purchase-orders")
  //       .then(({ data, status, code }) => {
  //         console.log(data);

  //         transactions.value = data.data;

  //         if (status == 200) {
  //           if (data?.status == 200) {
  //           }
  //         } else if (code == 500) {
  //           console.log(code);
  //         } else if (code == 401) {
  //           console.log(code);
  //         } else if (code == 404) {
  //           console.log(code);
  //         }
  //         isLoading.value = false;
  //         // loading.value = false;
  //       })
  //       .catch((e) => {
  //         console.log({ e: e });
  //       })
  //       .finally(() => {
  //         isLoading.value = false;
  //         // loading.value = false;
  //       });
  //   };

  const postPayments = async (postedData) => {
    // console.log({ postedData: postedData });
    loading.value = true;

    await axios
      .post("/create-transaction", postedData, {
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

  const getPayments = async (postedData) => {
    await axios
      .get("/get-payments-methods")
      .then(({ data, status, code }) => {
        if (status == 200 || status == 201) {
          if (data?.status == 200 || status == 201) {
            paymentsMethods.value = data.data;
            console.log({ paymentsMethods: data.data });
            // transactions.value = data.data;
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
    transactions,
    loading,
    isLoading,
    getPayments,
    postPayments,
    paymentsMethods
  };
}
