import { ref } from "vue";
import axios from "axios";

export default function () {
  const customers = ref([]);
  const error = ref();

  const loading = ref(false);
  const isLoading = ref(false);

  const getCustomers = async () => {
    isLoading.value = true;
    // loading.value = true;

    await axios
      .get("/customers")
      .then(({ data, status, code }) => {
        // customers.value = data.data;
        if (status == 200) {
          if (data?.status == 200) {
            customers.value = data.data;
          }
        } else if (code == 500) {
          error.value = code;
          // console.log(code);
        } else if (code == 401) {
          error.value = code;
          // console.log(code);
        } else if (code == 404) {
          error.value = code;
          // console.log(code);
        }
        isLoading.value = false;
        // loading.value = false;
      })
      .catch((e) => {
        // console.log({ e: e });
        error.value = e;
      })
      .finally(() => {
        isLoading.value = false;
        // loading.value = false;
      });
  };

  const postCustomers = async (postedData) => {
    loading.value = true;
    // console.log({ postedData: postedData });

    await axios
      .post("/add-customer", postedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data, status, code }) => {
        if (status == 200) {
          if (data?.status == 200) {
            customers.value.push(data.data);
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

  const updateCustomers = async (postedData) => {
    loading.value = true;
    console.log({ postedData: postedData });

    await axios
      .post(`/update-customer/${postedData.id}`, postedData)
      .then(({ data, status, code }) => {
        if (status == 200) {
          if (data?.status == 200) {
            customers.value.push(data.data);
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
    customers,
    loading,
    isLoading,
    getCustomers,
    postCustomers,
    updateCustomers,
  };
}
