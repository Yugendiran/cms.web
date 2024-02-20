let apiUrl = process.env.API_URL || "http://localhost:5000/api";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    [
      "@pinia/nuxt",
      {
        autoImports: [
          // automatically imports `defineStore`
          "defineStore",
        ],
      },
    ],
  ],
  build: {
    transpile: ["vue-toastification"],
  },
  app: {
    head: {
      title: "CMS",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        {
          hid: "description",
          name: "description",
          content: "CMS",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "keywords",
          content: "CMS",
        },
        {
          name: "author",
          content: "Yugendiran",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Livvic:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,900&display=swap",
        },
      ],
    },
  },
  css: ["@/assets/style.scss"],
  runtimeConfig: {
    public: {
      apiUrl,
    },
  },
};
