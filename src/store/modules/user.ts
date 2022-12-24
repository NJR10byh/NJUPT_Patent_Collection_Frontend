import { defineStore } from "pinia";
import { store, usePermissionStore } from "@/store";

const userInfo = {
  id: "",
  username: "",
  name: "",
  phone: "",
  email: "",
  role: ""
};

export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: userInfo
  }),
  getters: {
    role: (state) => {
      return state.userInfo.role;
    }
  },
  actions: {
    getUserInfo(userinfo) {
      this.userInfo = userinfo;
    },
    logout() {
      this.userInfo = {
        id: "",
        username: "",
        name: "",
        phone: "",
        email: "",
        role: ""
      };
    }
  },
  persist: {
    afterRestore: (ctx) => {
      if (ctx.store.roles && ctx.store.roles.length > 0) {
        const permissionStore = usePermissionStore();
        permissionStore.initRoutes(ctx.store.roles);
      }
    }
  }
});

export function getUserStore() {
  return useUserStore(store);
}
