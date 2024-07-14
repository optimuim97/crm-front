import { createRouter, createWebHistory } from "vue-router";
import store from "@/stores/index";
import { jwtDecode } from "jwt-decode";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Connexion",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/products",
      name: "Produits",
      component: () => import("@/views/Products/ProductView.vue"),
    },   
    {
      path: "/providers",
      name: "Fournisseurs",
      component: () => import("@/views/Providers/ProviderView.vue"),
    },   
    {
      path: "/customers",
      name: "Utilisateurs",
      component: () => import("@/views/Customers/CustomerView.vue"),
    },   
    {
      path: "/create-purchase-order",
      name: "CreatePurchaseOrder",
      component: () => import("@/views/CreatePurchaseOrderView.vue"),
    },   
  ],
});

// router.beforeEach(async (to, from, next) => {
//   const storeUser = store();

//   if (storeUser.token) {
//     const decoded = jwtDecode(storeUser.token);
//     var exp = decoded.exp;
//   }

//   if (to.name !== "Connexion" && !storeUser.isAuthenticated) {
//     next({ name: "Connexion" });
//   } else if (to.name !== "Connexion" && storeUser.isAuthenticated) {
//     if (exp < Date.now() / 1000) {
//       next({ name: "Connexion" });
//     }
//     next();
//   } else {
//     next();
//   }
// });

// router.beforeEach(async (to, from, next) => {
//   const storeUser = store();
//   // console.log(storeUser);

//   if (storeUser.token) {
//     const decoded = jwtDecode(storeUser.token);
//     exp.value = decoded.exp;
//   } else {
//     var exp = 1;
//   }

//   if (to.name !== "Connexion" && !storeUser.isAuthenticated) {
//     next({ name: "Connexion" });
//   } else if (to.name !== "Connexion" && storeUser.isAuthenticated) {
//     if (exp < Date.now() / 1000) {
//       next({ name: "Connexion" });
//     }
//     next();
//   } else {
//     next();
//   }
// });

export default router;
