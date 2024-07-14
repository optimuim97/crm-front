<script setup>
import { ref } from "vue";
import axios from "axios";
import store from "@/stores/index";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import Button from "primevue/button";
import { jwtDecode } from "jwt-decode";
// const showAlert = ref(false);
const authentification = ref({
  email: "",
  password: "",
});

const storeAdmin = store();
const loading = ref();
const router = useRouter();

if (storeAdmin.token) {
  const decoded = jwtDecode(storeAdmin.token);
  var exp = decoded.exp;
}

if (exp < Date.now() / 1000) {
  // router.push({ name: "Connexion" });
} else {
  // router.push({ name: "Accueil" });
}

const login = async () => {
  if (
    authentification.value.email.replace(/\s/g, "") === "" ||
    authentification.value.password === ""
  ) {
    toast.info("Veuillez renseigner votre e-mail et votre mot de passe !", {
      autoClose: true,
    });
    return false;
  }

  // console.log(authentification.value);
  loading.value = true; ////Couper le loader du bouton de connexion
  try {
    const datas = await axios.post("authentification", authentification.value);

    if (datas.data.code === 403) {
      toast.error(datas.data.message, {
        autoClose: true,
      }); // ToastOptions
    } else if (datas.data.code === 401) {
      toast.error(datas.data.message, {
        autoClose: true,
      });
    }

    loading.value = false;

    storeAdmin.setUser(datas.data.administrateur);
    storeAdmin.setToken(datas.data.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${datas.data.token}`;

    router.push({ name: "Connexion" });
  } catch (err) {
    loading.value = false; ////Couper le loader du bouton de connexion
    if (err.response?.data?.status === 401) {
      toast.error(err.response?.data?.message, {
        autoClose: true,
      }); // ToastOptions
    } else if (err.response?.data?.status === 429) {
      toast.error(err.response?.data?.message, {
        autoClose: true,
      }); // ToastOptions
    } else if (err.response?.data?.code === 401) {
      toast.error(err.response?.data?.message, {
        autoClose: true,
      }); // ToastOptions
    }
  }
};

</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>

<template>
  <div id="bg-body-wrapper" class="bg-body wrapper dark:bg-dark-bg">
    <section class="block">
      <div class="flex flex-wrap m-0 items-center bg-white dark:bg-dark-card h-screen">
        <div class="md:w-1/2 w-full flex-auto">
          <div class="flex flex-wrap justify-center">
            <div class="flex-auto md:px-10 px-4">
              <div
                class="relative flex flex-col overflow-hidden bg-white rounded-lg card-transparent shadow-none xl:px-[9rem] justify-center mb-0 dark:bg-dark-card"
              >
                <div class="flex-auto p-6 auth">
                  <a
                    href="../../dashboard/index.html"
                    class="py-1 text-xl whitespace-nowrap mr-4 flex items-center mb-4"
                  >
                    <!--Logo start-->
                    <img src="" alt="" class="w-6" />
                    <!--logo End-->
                    <h4 class="mb-0 ml-2">CRM</h4>
                  </a>
                  <h2 class="text-center">Connexion</h2>
                  <p class="text-center mb-4">
                    Veuillez vous authentifier pour <br />
                    accéder à votre compte.
                  </p>

                  <form>
                    <div class="flex flex-wrap">
                      <div class="flex-auto w-full mb-4">
                        <label for="email" class="mb-2 inline-block">E-mail</label>
                        <input
                          type="email"
                          v-model="authentification.email"
                          class="form-control dark:bg-dark-card focus:border-primary-500 dark:focus:border-primary-500"
                          id="email"
                          aria-describedby="email"
                        />
                      </div>
                      <div class="flex-auto w-full mb-4">
                        <label for="password" class="mb-2 inline-block"
                          >Mot de passe</label
                        >
                        <input
                          type="password"
                          v-model="authentification.password"
                          class="form-control dark:bg-dark-card focus:border-primary-500 dark:focus:border-primary-500"
                          id="password"
                          aria-describedby="password"
                        />
                      </div>
                      <!--											<div class="flex-auto w-full flex justify-between items-center">-->
                      <!--												<div class="flex">-->
                      <!--													<input type="checkbox"-->
                      <!--													       class="rounded ml-2 mt-1 bg-no-repeat bg-center w-4 h-4 border border-primary-500 float-left"-->
                      <!--													       id="customCheck1">-->
                      <!--													<label class="form-check-label ml-2" for="customCheck1">-->
                      <!--														Remember Me-->
                      <!--													</label>-->
                      <!--												</div>-->
                      <!--												&lt;!&ndash;<a href="../../dashboard/auth/recoverpw.html"-->
                      <!--												   class="text-primary-500 hover:text-primary-600">Forgot-->
                      <!--													Password?-->
                      <!--												</a> &ndash;&gt;-->
                      <!--											</div>-->
                    </div>
                    <div class="flex justify-center">
                      <!--											<button type="button" class="btn btn-primary" @click="login">Connexion</button>-->
                      <Button
                        label="Connexion"
                        :loading="loading"
                        @click="login"
                        class="btn-primary btn"
                        style="display: flex"
                        icon-pos="right"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="absolute left-0 top-0">
            <svg
              width="280"
              height="230"
              viewBox="0 0 431 398"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.05">
                <rect
                  x="-157.085"
                  y="193.773"
                  width="543"
                  height="77.5714"
                  rx="38.7857"
                  transform="rotate(-45 -157.085 193.773)"
                  fill="#3B8AFF"
                />
                <rect
                  x="7.46875"
                  y="358.327"
                  width="543"
                  height="77.5714"
                  rx="38.7857"
                  transform="rotate(-45 7.46875 358.327)"
                  fill="#3B8AFF"
                />
                <rect
                  x="61.9355"
                  y="138.545"
                  width="310.286"
                  height="77.5714"
                  rx="38.7857"
                  transform="rotate(45 61.9355 138.545)"
                  fill="#3B8AFF"
                />
                <rect
                  x="62.3154"
                  y="-190.173"
                  width="543"
                  height="77.5714"
                  rx="38.7857"
                  transform="rotate(45 62.3154 -190.173)"
                  fill="#3B8AFF"
                />
              </g>
            </svg>
          </div>
        </div>
        <div
          class="animated-scaleX flex-auto w-2/4 md:block hidden bg-primary-500 p-0 -mt-1 h-screen overflow-hidden"
        >
          <img
            src="@/assets/images/auth-pro/06.jpg"
            class="h-full w-full object-cover"
            alt="images"
          />
        </div>
      </div>
    </section>
  </div>
</template>
