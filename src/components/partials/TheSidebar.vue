<template>
  <aside
    :class="[
      setting.sidebar_menu_style,
      setting.sidebar_color,
      setting.sidebar_type.join(' '),
    ]"
    class="sidebar sidebar-base"
  >
    <div
      class="sidebar-header relative flex items-center justify-start mb-3 border-b z-0"
    >
      <RouterLink
        :to="{ name: 'Connexion' }"
        class="flex px-5 py-4 mr-4 rtl:ml-4 rtl:mr-0 text-xl whitespace-nowrap"
      >
        <img src="@/assets/images/auth-pro/01.png" class="w-7 h-7" />
        <h4 class="sidebar-logo text-base">{{ appName }}</h4>
      </RouterLink>
      <div class="sidebar-toggle" data-toggle="sidebar" data-active="true">
        <i class="icon">
          <svg
            width="20"
            viewBox="0 0 24 24"
            class="icon-20 rtl:rotate-180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.25 12.2744L19.25 12.2744"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M10.2998 18.2988L4.2498 12.2748L10.2998 6.24976"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </i>
      </div>
    </div>
    <div class="sidebar-body data-scrollbar overflow-y-scroll">
      <ul class="sidebar-main-menu">
        <li class="nav-item">
          <RouterLink
            :to="{ name: 'Achats' }"
            class="nav-link"
            :class="{ active: currentRoute == 'Achats' }"
            aria-current="page"
          >
            <i
              class="icon"
              data-tp-toggle="tooltip"
              data-tp-placement="left"
              data-tp-title="Dashboard"
            >
              <svg
                width="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z"
                  fill="currentColor"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z"
                  fill="currentColor"
                ></path>
              </svg>
            </i>
            <span class="item-name">Achats</span>
          </RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink
            :to="{ name: 'Ventes' }"
            class="nav-link"
            :class="{ active: currentRoute == 'Ventes' }"
            aria-current="page"
          >
            <i
              class="icon"
              data-tp-toggle="tooltip"
              data-tp-placement="left"
              data-tp-title="Dashboard"
            >
              <svg
                width="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z"
                  fill="currentColor"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z"
                  fill="currentColor"
                ></path>
              </svg>
            </i>
            <span class="item-name">Ventes</span>
          </RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink
            :to="{ name: 'Produits' }"
            class="nav-link"
            :class="{ active: currentRoute == 'Produits' }"
            aria-current="page"
          >
            <i
              class="icon"
              data-tp-toggle="tooltip"
              data-tp-placement="left"
              data-tp-title="Dashboard"
            >
              <svg
                width="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z"
                  fill="currentColor"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z"
                  fill="currentColor"
                ></path>
              </svg>
            </i>
            <span class="item-name">Produits</span>
          </RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink
            :to="{ name: 'Fournisseurs' }"
            class="nav-link"
            :class="{ active: currentRoute == 'Fournisseurs' }"
            aria-current="page"
          >
            <i
              class="icon"
              data-tp-toggle="tooltip"
              data-tp-placement="left"
              data-tp-title="Dashboard"
            >
              <svg
                width="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z"
                  fill="currentColor"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z"
                  fill="currentColor"
                ></path>
              </svg>
            </i>
            <span class="item-name"> Fournisseurs </span>
          </RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink
            :to="{ name: 'Clients' }"
            class="nav-link"
            :class="{ active: currentRoute == 'Clients' }"
            aria-current="page"
          >
            <i
              class="icon"
              data-tp-toggle="tooltip"
              data-tp-placement="left"
              data-tp-title="Dashboard"
            >
              <svg
                width="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z"
                  fill="currentColor"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z"
                  fill="currentColor"
                ></path>
              </svg>
            </i>
            <span class="item-name"> Clients </span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import {
  setting,
  // selected,
  // menu_active,
  appName,
  //   toggle,
  sidebarMini,
  // resize,
  // toggleMiniSidebar
} from "@/utils/settings";
// import axios from "axios";

// Icons
// import { icons } from "@/utils/icons";
// import store from "@/stores";

// const storeAdmin = store();
const router = useRouter();
const currentRoute = router.currentRoute.value.name;
const pagesAcces = ref([]);
// const ADMIN_ACTIONS = ref({
//   ADD_ACTION: false,
//   EDIT_ACTION: false,
//   DELETE_ACTION: false,
// });

/**
 * Vérifie les accès et autorisations de l'admin
 * @returns {Promise<void>}
 */
// const checkAutorisation = async () => {

//     try {
//         const objetAdmistrateur = await axios.get('backoffice/user/admin-connected')
//         //console.log(objetAdmistrateur)
//         //recuper les pages dacces dun administratuer
//         pagesAcces.value = [...objetAdmistrateur.data.data.page_acces].filter(item => item.auth === true)
//         pagesAcces.value.forEach(item => {
//             item.sous_menu = [...item.sous_menu].filter(element => element.auth === true)
//         })
//         //console.log(pagesAcces.value)

//         // Parcours de la liste des parents
//         pagesAcces.value.forEach(parent => {
//             // Recherche de l'élément correspondant à la route actuelle dans le sous-menu du parent
//             const item = parent.sous_menu.find(item => item.nom === currentRoute);

//             // Si l'élément correspondant est trouvé
//             if (item) {
//                 // Activation du parent
//                 toggle(parent.libelle);

//                 // Mapping des libellés d'action aux clés d'action administratives
//                 const actionsMap = {
//                     "Ajouter": "ADD_ACTION",
//                     "Modifier": "EDIT_ACTION",
//                     "Supprimer": "DELETE_ACTION"
//                 };

//                 // Parcours des actions de l'élément
//                 item.actions.forEach(action => {
//                     // Si l'action est active et le libellé correspond à une clé d'action administrative
//                     if (action.active === true && actionsMap[action.libelle]) {
//                         // Activation de l'action administrative correspondante
//                         ADMIN_ACTIONS.value[actionsMap[action.libelle]] = true;
//                     }
//                 });
//             }
//         });

//         // Mise à jour du state
//         storeAdmin.setAdminActions(ADMIN_ACTIONS.value)

//     } catch (err) {
//         console.log(err)
//     }
// }

onMounted(() => {
  // checkAutorisation();
});

// const _setActiveParent = (_item) => {
//     if (_item.sous_menu.length) {
//         let new_arr = _item.sous_menu.map(el => el.nom);
//         return new_arr.includes(currentRoute);
//     }
//     return false;
// }
</script>

<style></style>
