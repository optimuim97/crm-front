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
      <div
        class="sidebar-toggle"
        @click="sidebarMini"
        data-toggle="sidebar"
        data-active="true"
      >
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
    <div class="sidebar-body data-scrollbar overflow-y-scroll" v-if="pagesAcces.length">
      <ul class="sidebar-main-menu">
        <!-- <li class="nav-item" v-for="item of pagesAcces" :key="item">
                    <a class="nav-link" v-if="item.sous_menu.length"
                       :class="_setActiveParent(item) ? 'active' : ''"
                       @click="toggle(item.libelle)">
                        
                        <i class="icon" data-tp-toggle="tooltip" data-tp-placement="left"
                           data-tp-title="Droits d'accès">
                            <span v-html="icons[item.nom]"></span>
                        </i>
                        <span class="item-name">
                            {{ item.libelle }}
                        </span>
                        <i class="rtl:rotate-180 right-icon" v-if="item.sous_menu.length"
                           :style="selected.includes(item.libelle)  ? 'transform:  rotate(90deg)' : ''">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M9 5l7 7-7 7"></path>
                            </svg>
                        </i>
                    </a>
                    <RouterLink :to="item.nom" class="nav-link" v-else
                                :class="_setActiveParent(item) || currentRoute === item.nom ? 'active' : ''"
                                @click="toggle(item.libelle)">
                        
                        <i class="icon" data-tp-toggle="tooltip" data-tp-placement="left"
                           data-tp-title="Droits d'accès">
                            <span v-html="icons[item.nom]"></span>
                        </i>
                        <span class="item-name">
                            {{ item.libelle }}
                        </span>
                        <i class="rtl:rotate-180 right-icon" v-if="item.sous_menu.length"
                           :style="selected.includes(item.libelle)  ? 'transform:  rotate(90deg)' : ''">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M9 5l7 7-7 7"></path>
                            </svg>
                        </i>
                    </RouterLink>
                    <ul class="sub-menu" id="horizontal-menu" ref="menu_style" v-if="item.sous_menu.length"
                        :style="selected.includes(item.libelle) ? 'max-height: ' + setting.scrollHeight + 'px' : ''">
                        <li class="nav-item" v-for="element of item.sous_menu" :key="element">
                            <RouterLink :to="{name: element.nom}" class="nav-link"
                                        :class="(currentRoute === element.nom) ? 'active' : ''"
                                        @click="toggle(element.nom)">
                                <i class="icon">
                                    <span v-html="icons[element.nom]"></span>
                                </i>
                                <i class="sidenav-mini-icon" data-tp-toggle="tooltip" data-tp-placement="left"
                                   data-tp-title="Horizontal"> {{ element.libelle[0] }} </i>
                                <span class="item-name"> {{ element.libelle }} </span>
                            </RouterLink>
                        </li>
                    
                    </ul>
                </li> -->
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { onMounted, ref } from "vue";
// import { useRouter } from "vue-router";
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
// const router = useRouter();
// const currentRoute = router.currentRoute.value.name;
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
