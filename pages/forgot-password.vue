<template>
  <div class="p-4">
    <div class="flex-1">
      <div class="max-w-xl mx-auto mt-10">
        <div class="px-4 py-10 border rounded-2xl border-black/10">
          <div>
            <h1 class="mb-3 text-4xl font-bold text-center">Forgot Password</h1>
            <p class="text-center w-[80%] mx-auto text-black/60">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit,
              quia.
            </p>
          </div>

          <div class="flex flex-col gap-3 mt-4">
            <div>
              <input
                v-model="email"
                type="text"
                class="w-full h-14 bg-[#EFEFEF] rounded-xl border-none outline-none px-5"
                placeholder="Enter your email"
                @keyup.enter="forgotPassword()"
              />
            </div>
            <div>
              <button
                v-if="!isLoading"
                @click="forgotPassword()"
                class="w-full px-5 mt-5 text-xl font-semibold text-white border-none outline-none h-14 bg-gradient-to-r from-theme-pink to-theme-blue rounded-xl"
              >
                Submit
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
      email: "",
      state: "pending",
      isLoading: false,
    };
  },
  methods: {
    forgotPassword() {
      if (!this.email) {
        this.toast.error("Please enter your email");
        return;
      }

      this.email = this.email.toLowerCase();

      this.isLoading = true;

      this.$api
        .post("/auth/forgot-password", {
          email: this.email,
        })
        .then((res) => {
          if (res.success) {
            this.$router.push(
              "/validate-otp?action=forgot-password&email=" +
                this.email +
                `${
                  this.$route.query.redirect
                    ? `&redirect=${this.$route.query.redirect}`
                    : ""
                }`
            );

            this.isLoading = false;
            return;
          }
          this.isLoading = false;
          this.toast.error(res.message);
        });
    },
  },
};
</script>
