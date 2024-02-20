import { useAuthStore } from "~/store/auth";

export default defineNuxtPlugin((nuxtApp) => {
  let accessToken = useCookie("accessToken");
  let refreshToken = useCookie("refreshToken");

  let isUrl = (path) => {
    return path.includes("http://") || path.includes("https://");
  };

  const api = {
    get: async (path) => {
      let options = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (accessToken.value) {
        options.headers["Authorization"] = `Bearer ${accessToken.value}`;
      }

      let res = await fetch(
        `${isUrl(path) ? "" : useRuntimeConfig().public.apiUrl}${path}`,
        options
      );

      let data = await res.json();

      if (data.login == false) {
        if (refreshToken.value) {
          let res = await useAuthStore().authenticateUserRefresh();

          accessToken = useCookie("accessToken");

          if (res.success) {
            return api.get(path);
          }
        } else {
          useRouter().push("/login");
        }
      }

      return data;
    },
    post: async (path, body) => {
      console.log("path", useRuntimeConfig().public.apiUrl);
      let options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };

      if (accessToken.value) {
        options.headers["Authorization"] = `Bearer ${accessToken.value}`;
      }

      let res = await fetch(
        `${isUrl(path) ? "" : useRuntimeConfig().public.apiUrl}${path}`,
        options
      );

      let data = await res.json();

      if (data.login == false) {
        if (refreshToken.value) {
          let res = await useAuthStore().authenticateUserRefresh();

          accessToken = useCookie("accessToken");

          if (res.success) {
            return api.post(path, body);
          }
        } else {
          useRouter().push("/login");
        }
      }

      return data;
    },
  };

  return {
    provide: {
      api,
    },
  };
});
