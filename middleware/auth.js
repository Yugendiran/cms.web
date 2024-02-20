import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";

// eslint-disable-next-line require-await
export default defineNuxtRouteMiddleware(async (to) => {
  const { authenticated } = storeToRefs(useAuthStore());
  const accessToken = useCookie("accessToken");
  const refreshToken = useCookie("refreshToken");

  if (accessToken.value) {
    authenticated.value = true;
  }

  // if token exists and url is /login redirect to homepage
  if (accessToken.value && to?.name === "login") {
    if (useRoute().query.redirect) {
      if (process.client) {
        window.location.href = useRoute().query.redirect;
      }
    } else {
      return navigateTo("/");
    }
  }

  if (!accessToken.value && to?.name !== "login") {
    if (refreshToken.value) {
      // useAuthStore().authenticateUserRefresh();

      return;
    }
    abortNavigation();
    return navigateTo("/login");
  }
});
