<script setup>
definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <div class="p-4">
    <div class="flex-1">
      <div class="max-w-xl mx-auto mt-10">
        <div class="px-4 py-10 border rounded-2xl border-black/10">
          <div>
            <h1 class="mb-3 text-4xl font-bold text-center">Reset Password</h1>
            <p class="text-center w-[80%] mx-auto text-black/60">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit,
              quia.
            </p>
          </div>

          <div class="flex flex-col gap-3 mt-4">
            <div>
              <input
                v-model="password"
                type="password"
                class="w-full h-14 bg-[#EFEFEF] rounded-xl border-none outline-none px-5"
                placeholder="Enter your new password"
                @keyup.enter="resetPassword()"
              />
            </div>
            <div class="relative">
              <input
                v-model="confirmPassword"
                :type="passwordVisible ? 'text' : 'password'"
                class="w-full h-14 bg-[#EFEFEF] rounded-xl border-none outline-none px-5"
                placeholder="Re-Enter your new password"
                @keyup.enter="resetPassword()"
              />
              <div
                @click="passwordVisible = !passwordVisible"
                class="absolute -translate-y-1/2 right-4 top-1/2 text-black/80"
              >
                <i v-if="passwordVisible" class="fa-solid fa-eye-slash"></i>
                <i v-else class="fa-solid fa-eye"></i>
              </div>
            </div>
            <div>
              <button
                v-if="!isLoading"
                @click="resetPassword()"
                class="w-full px-5 mt-5 text-xl font-semibold text-white border-none outline-none h-14 bg-gradient-to-r from-theme-pink to-theme-blue rounded-xl"
              >
                Reset Password
              </button>
              <div v-else>
                <img src="/load.gif" class="h-20 mx-auto" alt="" />
              </div>
            </div>
            <div>
              <p class="text-black/60">
                <NuxtLink
                  :to="
                    `/login` +
                    `${
                      $route.query.redirect
                        ? `?redirect=${$route.query.redirect}`
                        : ''
                    }`
                  "
                >
                  Know your credentials? <span class="font-bold">Log In</span>
                </NuxtLink>
              </p>
            </div>
          </div>
        </div>
        <div class="w-full mt-4">
          <div class="flex items-center justify-center gap-4">
            <span class="text-sm">Terms</span>
            <span class="text-sm">Privacy</span>
            <span class="text-sm">Contact Us</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";

export default {
  data() {
    return {
      toast: useToast(),
      token: this.$route.query.token,
      isLoading: false,
      password: "",
      confirmPassword: "",
      passwordVisible: false,
    };
  },
  mounted() {},
  methods: {
    resetPassword() {
      if (!this.password) {
        this.toast.error("Password is required");
        return;
      }
      if (!this.confirmPassword) {
        this.toast.error("Confirm Password is required");
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.toast.error("Password and Confirm Password should be same");
        return;
      }

      this.isLoading = true;

      this.$api
        .post(`/auth/reset-password`, {
          password: this.password,
        })
        .then((res) => {
          if (res.success) {
            this.toast.success(res.message);
            if (this.$route.query.redirect) {
              window.location.href = this.$route.query.redirect;
            } else {
              this.$router.push("/login");
            }
            return;
          }
          this.isLoading = false;
          this.toast.error(res.message);
        });
    },
  },
};
</script>
