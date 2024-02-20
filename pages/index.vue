<script setup>
definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <div>Home {{ message }}</div>
</template>

<script>
export default {
  data() {
    return {
      message: {},
    };
  },
  mounted() {
    this.testApi();
  },
  methods: {
    testApi() {
      this.$api.get("/user/test-p").then((res) => {
        this.message = res;
      });
    },
  },
};
</script>
