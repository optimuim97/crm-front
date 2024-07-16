import { ref } from "vue";
import axios from "axios";

export default function () {
  const invoice = ref();
  const error = ref();

  const loading = ref(false);
  const isLoading = ref(false);

  const getInvoice = async (invoiceNumber) => {
    loading.value = true;
    console.log({ invoiceNumber });

    await axios
      .get(`/get-invoice/${invoiceNumber}`)
      .then(({ data, status, code }) => {
        if (status == 200) {
          if (data?.status == 200) {
            invoice.value = data.data.invoice;
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


  return {
    invoice,
    loading,
    isLoading,
    getInvoice
  };
}
