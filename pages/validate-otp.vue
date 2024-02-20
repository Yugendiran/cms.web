<template>
  <div class="p-4">
    <div class="flex-1">
      <div class="max-w-xl mx-auto mt-10">
        <div class="px-4 py-10 border rounded-2xl border-black/10">
          <div>
            <h1 class="mb-3 text-4xl font-bold text-center">Validate OTP</h1>
            <p class="text-center w-[80%] mx-auto text-black/60">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit,
              quia.
            </p>
          </div>

          <div class="flex flex-col gap-3 mt-4">
            <div>
              <input
                v-model="otp"
                type="text"
                class="w-full h-14 text-center bg-[#EFEFEF] rounded-xl border-none outline-none px-5"
                placeholder="XXXXXX"
                maxlength="6"
                @keyup.enter="validateOtp()"
              />
            </div>
            <div>
              <p
                v-if="resendEnabled"
                class="font-bold text-right cursor-not-allowed text-black/30"
              >
                Resend OTP. Wait for {{ secToMin(resendTimer) }}
              </p>
              <p
                v-else
                @click="resendOtp()"
                class="font-semibold text-right cursor-pointer text-black/60"
              >
                Resend OTP
              </p>
            </div>
            <div>
              <button
                v-if="!isLoading"
                @click="validateOtp()"
                class="w-full px-5 mt-5 text-xl font-semibold text-white border-none outline-none h-14 bg-gradient-to-r from-theme-pink to-theme-blue rounded-xl"
              >
                Validate OTP
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
                  Already a user? <span class="font-bold">Log In</span>
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
      toast: useToast(),
      authStore: useAuthStore(),
      email: this.$route.query.email,
      action: this.$route.query.action,
      isLoading: false,
      otp: "",
      resendEnabled:
        window.localStorage.getItem("resendEnabled") == "true"
          ? true
          : false || false,
      resendTimer: Number(window.localStorage.getItem("resendTimer")) || 90,
    };
  },
  mounted() {
    if (!this.email || !this.action) {
      this.$router.push(
        "/login" +
          `${
            this.$route.query.redirect
              ? `?redirect=${this.$route.query.redirect}`
              : ""
          }`
      );
    }

    if (this.resendTimer > 0 && this.resendEnabled) {
      this.resendOtp();
    }

    if (this.$route.query.forceResendOtp) {
      this.resendOtp();
    }
  },
  methods: {
    validateOtp() {
      if (this.otp.toString().length !== 6) {
        this.toast.error("OTP must be 6 digits long");
        return;
      }

      this.email = this.email.toLowerCase();

      this.isLoading = true;

      this.$api
        .post("/auth/validate-otp", {
          email: this.email,
          code: this.otp,
          action: this.action,
        })
        .then((res) => {
          if (res.success) {
            this.toast.success(res.message);

            let authenticateUser = this.authStore.authenticateUser(
              res.accessToken,
              res.accessTokenExp,
              res.refreshToken,
              res.refreshTokenExp
            );

            if (authenticateUser) {
              if (this.action == "forgot-password") {
                if (this.$route.query.redirect) {
                  this.$router.push(
                    "/reset-password?redirect=" + this.$route.query.redirect
                  );
                } else {
                  this.$router.push("/reset-password");
                }
              } else {
                if (this.$route.query.redirect) {
                  window.location.href =
                    this.$route.query.redirect +
                    `?access_token=${res.accessToken}&access_token_exp=${res.accessTokenExp}&refresh_token=${res.refreshToken}&refresh_token_exp=${res.refreshTokenExp}`;
                } else {
                  this.$router.push("/");
                }
              }
              return;
            }
            return;
          }
          this.toast.error(res.message);
          this.isLoading = false;

          if (res.message == "User not found") {
            this.$router.push(
              "/register" +
                `${
                  this.$route.query.redirect
                    ? `?redirect=${this.$route.query.redirect}`
                    : ""
                }`
            );
          }
        });
    },
    resendOtp() {
      this.email = this.email.toLowerCase();
      if (!this.resendEnabled) {
        this.$api
          .post("/auth/resend-otp", {
            email: this.email,
            action: this.action,
          })
          .then((res) => {
            if (res.success) {
              this.toast.success(res.message);
            } else {
              this.toast.error(res.message);

              if (res.message == "User already verified") {
                this.$router.push(
                  "/login" +
                    `${
                      this.$route.query.redirect
                        ? `?redirect=${this.$route.query.redirect}`
                        : ""
                    }`
                );
              }

              return;
            }
          });
      }

      this.resendEnabled = true;
      localStorage.setItem("resendEnabled", this.resendEnabled);

      const interval = setInterval(() => {
        this.resendTimer--;
        localStorage.setItem("resendTimer", this.resendTimer);

        if (this.resendTimer <= 0) {
          this.resendEnabled = false;
          this.resendTimer = 90;
          localStorage.setItem("resendEnabled", this.resendEnabled);
          clearInterval(interval);
        }
      }, 1000);
    },
    secToMin(sec) {
      const minutes = Math.floor(sec / 60);
      const seconds = sec % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    },
  },
};
</script>
