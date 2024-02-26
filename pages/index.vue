<script setup>
definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <div>
    <NavBar />
    <div class="flex flex-col w-full gap-5 lg:h-[calc(100vh-80px)] lg:flex-row">
      <div class="w-full h-full lg:w-[70%] lg:overflow-auto p-10">
        <div class="space-y-20 lg:space-y-20">
          <article
            v-for="(post, index) in posts"
            :key="index"
            class="relative flex flex-col gap-8 isolate lg:flex-row"
          >
            <div
              class="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0"
            >
              <img
                :src="post.banner"
                alt=""
                class="absolute inset-0 object-cover w-full h-full rounded-2xl bg-gray-50"
              />
              <div
                class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"
              ></div>
            </div>
            <div>
              <div class="flex items-center text-xs gap-x-4">
                <p class="text-gray-500">
                  {{ post.updatedAt }}
                </p>
                <NuxtLink
                  :to="`/blogs?tagId=${post.tagId}`"
                  class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {{ post.tagName }}
                </NuxtLink>
              </div>
              <div class="relative max-w-xl group">
                <h3
                  class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
                >
                  <NuxtLink :to="`/blogs/${post.postId}`">
                    <span class="absolute inset-0"></span>
                    {{ post.title }}
                  </NuxtLink>
                </h3>
                <p class="mt-5 text-sm leading-6 text-gray-600 line-clamp-5">
                  {{ post.description }}
                </p>
              </div>
            </div>
          </article>

          <!-- More posts... -->
        </div>
      </div>
      <div class="w-full h-full lg:w-[30%] lg:overflow-auto p-10">
        <div>
          <h2 class="text-2xl font-semibold text-gray-900">Popular Posts</h2>
          <div class="mt-6 space-y-6">
            <div v-for="(post, index) in popularPosts" :key="index">
              <NuxtLink :to="`/blogs/${post.postId}`">
                <div class="flex items-center space-x-4">
                  <div class="relative w-20 h-20">
                    <img
                      :src="post.banner"
                      alt=""
                      class="absolute inset-0 object-cover w-full h-full rounded-lg bg-gray-50"
                    />
                    <div
                      class="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10"
                    ></div>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold leading-6 text-gray-900">
                      {{ post.title }}
                    </h3>
                    <div class="flex justify-between text-xs">
                      <p>Read more</p>
                      <p>
                        {{ post.updatedAt }}
                      </p>
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </div>
            <!-- More posts... -->
          </div>
        </div>

        <div class="mt-10">
          <h2 class="text-2xl font-semibold text-gray-900">Tags</h2>
          <div class="flex flex-wrap gap-3 mt-6">
            <div v-for="(tag, index) in tags" :key="index">
              <NuxtLink :to="`/blogs?tagId=${tag.tagId}`">
                <div
                  class="relative rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {{ tag.tagName }}
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Loader v-if="isLoading" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      popularPosts: [],
      tags: [],
      isLoading: false,
    };
  },
  mounted() {
    this.getPosts();
    this.getPopularPosts();
    this.getTags();
  },
  methods: {
    async getPosts() {
      this.isLoading = true;

      await this.$api
        .get("/platform/posts?offset=0&limit=10&orderBy=createdAt&sortBy=DESC")
        .then((res) => {
          if (res.success) {
            this.posts = res.posts;
          }
        });

      this.isLoading = false;
    },
    async getPopularPosts() {
      this.isLoading = true;

      await this.$api
        .get("/platform/posts?offset=0&limit=5&orderBy=totalLikes&sortBy=DESC")
        .then((res) => {
          if (res.success) {
            this.popularPosts = res.posts;
          }
        });

      this.isLoading = false;
    },
    async getTags() {
      this.isLoading = true;

      await this.$api.get("/platform/tags").then((res) => {
        if (res.success) {
          this.tags = res.tags;
        }
      });

      this.isLoading = false;
    },
  },
};
</script>
