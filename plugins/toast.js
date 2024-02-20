import Toast, { TYPE } from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    toastDefaults: {
      // ToastOptions object for each type of toast

      [TYPE.ERROR]: {
        timeout: 3000,
        closeButton: false,
      },
      [TYPE.SUCCESS]: {
        timeout: 3000,
        closeButton: false,
      },
    },
    // toastContainerPadding: '100rem',
    position: "top-right",
  });
});
