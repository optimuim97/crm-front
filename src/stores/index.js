import { defineStore } from "pinia";

const store = defineStore("user", {
  state: () => ({
    admin: null,
    token: null,
    // State: admin_actions
    // Description: Actions possibles pour l'utilisateur connecté
    admin_actions: {
      ADD_ACTION: false,
      EDIT_ACTION: false,
      DELETE_ACTION: false,
    },
  }),
  persist: true,
  actions: {
    // async login(username, password) {
    // },

    logout() {
      this.admin = null;
      this.token = null;
      localStorage.removeItem("user");
    },

    setUser(user) {
      this.admin = user;
    },

    setToken(token) {
      this.token = token;
    },

    setAdminActions(actions_values) {
      this.admin_actions = actions_values;
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.admin,
    administrateur: (state) => state.admin,
    /**
     * Getter de admin_actions
     *
     * @param state
     * @returns {Object}
     */
    adminactions: (state) => state.admin_actions,
  },
});

export default store;
