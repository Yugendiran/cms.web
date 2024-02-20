<script setup async>
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";

let router = useRouter();
let route = useRoute();

let { logUserOut } = useAuthStore();

logUserOut();

router.push(
  `/login${route.query.redirect ? `?redirect=${route.query.redirect}` : ``}`
);
</script>

<template>
  <div></div>
</template>
