import axios from "axios";
import store from "@/stores/index";

axios.defaults.baseURL = "http://127.0.0.1:7777/api/";

axios.interceptors.request.use(function (config) {
  const storeUser = store();
  config.headers.Authorization = `Bearer ${storeUser.token}`;
  return config;
});

const axiosInstance = axios.create({});

export default {
  install: (app) => {
    app.config.globalProperties.$axios = { ...axiosInstance };
  },
};
