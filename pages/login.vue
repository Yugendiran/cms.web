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
            <h1 class="mb-3 text-4xl font-bold text-center">Log In</h1>
            <p class="text-center w-[80%] mx-auto text-black/60">
              Welcome back! Log in to your account
            </p>
          </div>

          <div class="flex flex-col gap-3 mt-4">
            <div>
              <input
                v-model="user.email"
                type="text"
                class="w-full h-14 bg-[#EFEFEF] rounded-xl border-none outline-none px-5"
                placeholder="Enter your email"
                @keyup.enter="login()"
              />
            </div>
            <div v-if="loginWith == 'password'" class="relative">
              <input
                v-model="user.password"
                :type="passwordVisible ? 'text' : 'password'"
                class="w-full h-14 bg-[#EFEFEF] rounded-xl border-none outline-none px-5"
                placeholder="Enter your password"
                @keyup.enter="login()"
              />
              <div
                @click="passwordVisible = !passwordVisible"
                class="absolute -translate-y-1/2 right-4 top-1/2 text-black/80"
              >
                <i v-if="passwordVisible" class="fa-solid fa-eye-slash"></i>
                <i v-else class="fa-solid fa-eye"></i>
              </div>
            </div>
            <div class="items-center justify-between md:flex">
              <p class="font-semibold text-black/60">
                <span v-if="loginWith == 'password'" @click="loginWith = 'otp'">
                  Login With OTP
                </span>
                <span
                  v-else-if="loginWith == 'otp'"
                  @click="loginWith = 'password'"
                >
                  Login With Password
                </span>
              </p>
              <p class="font-semibold text-black/60">
                <NuxtLink
                  :to="
                    `/forgot-password` +
                    `${
                      $route.query.redirect
                        ? `?redirect=${$route.query.redirect}`
                        : ''
                    }`
                  "
                >
                  Forgot your password?
                </NuxtLink>
              </p>
            </div>
            <div>
              <div v-if="!isLoading">
                <button
                  v-if="loginWith == 'password'"
                  @click="login()"
                  class="w-full px-5 mt-5 text-xl font-semibold text-white border-none outline-none h-14 bg-gradient-to-r from-theme-pink to-theme-blue rounded-xl"
                >
                  Log In
                </button>
                <button
                  v-else-if="loginWith == 'otp'"
                  @click="login()"
                  class="w-full px-5 mt-5 text-xl font-semibold text-white border-none outline-none h-14 bg-gradient-to-r from-theme-pink to-theme-blue rounded-xl"
                >
                  Send OTP
                </button>
              </div>
              <div v-else>
                <img src="/load.gif" class="h-20 mx-auto" alt="" />
              </div>
            </div>
            <div>
              <p class="text-black/60">
                <NuxtLink
                  :to="
                    `/register` +
                    `${
                      $route.query.redirect
                        ? `?redirect=${$route.query.redirect}`
                        : ''
                    }`
                  "
                >
                  New here? <span class="font-bold">Register</span>
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
import { useAuthStore } from "~/store/auth";
import { useToast } from "vue-toastification";

export default {
  data() {
    return {
      authStore: useAuthStore(),
      toast: useToast(),
      user: {
        email: "",
        password: "",
      },
      loginWith: "password",
      isLoading: false,
      passwordVisible: false,
    };
  },
  mounted() {},
  methods: {
    async login() {
      if (!this.user.email) {
        this.toast.error("Please enter your email");
        return;
      }

      this.user.email = this.user.email.toLowerCase();

      this.isLoading = true;

      this.$api
        .post("/auth/login", {
          method: this.loginWith,
          credentials: this.user,
        })
        .then((res) => {
          if (res.success) {
            if (this.loginWith == "password") {
              let authenticateUser = this.authStore.authenticateUser(
                res.accessToken,
                res.accessTokenExp,
                res.refreshToken,
                res.refreshTokenExp
              );

              if (authenticateUser) {
                if (this.$route.query.redirect) {
                  window.location.href =
                    this.$route.query.redirect +
                    `?access_token=${res.accessToken}&access_token_exp=${res.accessTokenExp}&refresh_token=${res.refreshToken}&refresh_token_exp=${res.refreshTokenExp}`;
                } else {
                  this.$router.push("/");
                }
                return;
              }
            } else if (this.loginWith == "otp") {
              this.$router.push(
                `/validate-otp?action=login&email=${this.user.email}` +
                  `${
                    this.$route.query.redirect
                      ? "&redirect=" + this.$route.query.redirect
                      : ""
                  }`
              );
              return;
            }
            return;
          }

          if (res.message == "User not verified") {
            this.$router.push(
              `/validate-otp?action=register&email=${this.user.email}&forceResendOtp=true` +
                `${
                  this.$route.query.redirect
                    ? "&redirect=" + this.$route.query.redirect
                    : ""
                }`
            );
            return;
          }

          this.isLoading = false;
          this.toast.error(res.message);

          if (res.message == "User not found") {
            if (this.$route.query.redirect) {
              this.$router.push(
                `/register?redirect=${this.$route.query.redirect}`
              );
            } else {
              this.$router.push(`/register`);
            }
            return;
          }
        });
    },
  },
};
</script>
