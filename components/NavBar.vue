<template>
  <div>
    <nav class="bg-gray-800">
      <div class="px-2 mx-auto sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-20">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <div
              class="flex items-center justify-center w-10 h-10 text-xl text-white"
            >
              <i
                v-if="mobileMenu"
                @click="mobileMenu = false"
                class="fa-solid fa-xmark"
              ></i>
              <i v-else @click="mobileMenu = true" class="fa-solid fa-bars"></i>
            </div>
          </div>
          <div
            class="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start"
          >
            <div class="flex items-center flex-shrink-0">
              <img
                class="w-auto h-8"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <NuxtLink
                  v-for="(item, index) in menuItems"
                  :key="index"
                  :to="item.route"
                  class="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                >
                  {{ item.title }}
                </NuxtLink>
              </div>
            </div>
          </div>
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
          >
            <!-- Profile dropdown -->
            <div class="relative ml-3">
              <div>
                <div
                  class="relative flex text-sm bg-gray-800 rounded-full group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <NuxtLink
                    to="/logout"
                    class="block px-4 py-2 text-sm text-gray-300"
                  >
                    Sign out
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div v-if="mobileMenu" class="sm:hidden" id="mobile-menu">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink
            v-for="(item, index) in menuItems"
            :key="index"
            :to="item.route"
            class="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
          >
            {{ item.title }}
          </NuxtLink>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobileMenu: false,
      profileIsOpen: false,
      menuItems: [
        {
          title: "Home",
          route: "/",
        },
        {
          title: "All blogs",
          route: "/blogs",
        },
      ],
    };
  },
};
</script>
