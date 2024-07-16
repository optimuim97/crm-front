import { ref } from "vue";
import axios from "axios";

export default function () {
  const providers = ref([]);
  const error = ref();

  const loading = ref(false);
  const isLoading = ref(false);

  const getProviders = async () => {
    isLoading.value = true;
    loading.value = true;

    await axios
      .get("/providers")
      .then(({ data, status, code }) => {
        console.log(data);

        providers.value = data.data;

        if (status == 200) {
          if (data?.status == 200) {
            providers.value = data.data;
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

  const postProviders = async (postedData) => {
    loading.value = true;
    console.log({ postedData: postedData });

    await axios
      .post("/add-provider", postedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data, status, code }) => {
        if (status == 200) {
          if (data?.status == 200) {
            providers.value.push(data.data);
            console.log({ result: data.data });
            // providers.value = data.data;
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

  const updateProviders = async (postedData) => {
    loading.value = true;
    console.log({ postedData: postedData });

    await axios
      .post(`/update-provider/${postedData.id}`, postedData)
      .then(({ data, status, code }) => {
        if (status == 200) {
          if (data?.status == 200) {
            providers.value.push(data.data);
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
    error,
    providers,
    loading,
    isLoading,
    getProviders,
    postProviders,
    updateProviders,
  };
}
