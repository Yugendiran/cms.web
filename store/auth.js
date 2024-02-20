import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser(
      accessToken,
      accessTokenExp,
      refreshToken,
      refreshTokenExp
    ) {
      let accessTokenCookie = useCookie("accessToken", {
        expires: new Date(accessTokenExp),
      });
      accessTokenCookie.value = accessToken;

      let refreshTokenCookie = useCookie("refreshToken", {
        expires: new Date(refreshTokenExp),
      });
      refreshTokenCookie.value = refreshToken;

      this.authenticated = true;

      return true;
    },
    async authenticateUserRefresh() {
      const refreshToken = useCookie("refreshToken");

      const res = await fetch(
        `${useRuntimeConfig().public.apiUrl}/auth/refresh-token`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            refreshToken: refreshToken.value,
          }),
        }
      ).then((res) => res.json());

      if (res.success) {
        const accessToken = useCookie("accessToken", {
          expires: new Date(res.accessTokenExp),
        });
        accessToken.value = res.accessToken;

        const refreshToken = useCookie("refreshToken", {
          expires: new Date(res.refreshTokenExp),
        });
        refreshToken.value = res.refreshToken;

        this.authenticated = true;

        return res;
      } else {
        return res;
      }
    },
    logUserOut() {
      this.authenticated = false;
      const accessToken = useCookie("accessToken");
      accessToken.value = null;
      const refreshToken = useCookie("refreshToken");
      refreshToken.value = null;
    },
  },
});
