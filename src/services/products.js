import { ref } from "vue";
import axios from "axios";

export default function () {
  const products = ref([]);
  const error = ref();

  const loading = ref(false);
  const isLoading = ref(false);

  const getProducts = async () => {
    isLoading.value = true;
    loading.value = true;

    await axios
      .get("/products")
      .then(({ data, status, code }) => {
        products.value = data.data;

        if (status == 200) {
          if (data?.status == 200) {
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
        loading.value = false;
      })
      .catch((e) => {
        error.value = e;
        console.log({ e: e });
      })
      .finally(() => {
        isLoading.value = false;
        loading.value = false;
      });
  };

  const postProducts = async (postedData) => {
    loading.value = true;
    console.log({ postedData: postedData });

    await axios
      .post("/add-product", postedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data, status, code }) => {
        if (status == 200) {
          if (data?.status == 200) {
            products.value.push(data.data);

            console.log({ result: data.data });

            // products.value = data.data;
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
        console.log({ error: e });
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const updateProducts = async (postedData) => {
    loading.value = true;
    console.log({ postedData: postedData });

    await axios
      .post(`/update-product/${postedData.id}`, postedData)
      .then(({ data, status, code }) => {
        if (status == 200) {
          if (data?.status == 200) {
            products.value.push(data.data);
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
        error.value = code;
        console.log({ error: e });
      })
      .finally(() => {
        loading.value = false;
      });
  };

  return {
    error,
    products,
    loading,
    isLoading,
    getProducts,
    postProducts,
    updateProducts,
  };
}
