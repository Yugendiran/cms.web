<template>
  <div>
    <NavBar />
    <div class="py-24 bg-white sm:py-32">
      <div class="px-6 mx-auto max-w-7xl lg:px-8">
        <div class="max-w-2xl mx-auto text-center">
          <h2
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            From the blog
          </h2>
          <p class="mt-2 text-lg leading-8 text-gray-600">
            Blog posts written by our team and our community.
          </p>
        </div>
        <div class="flex flex-wrap justify-center max-w-2xl gap-5 mx-auto mt-5">
          <div v-for="(tag, index) in tags" :key="index">
            <div
              @click="setTagFilter(tag.tagId)"
              class="flex items-center h-10 px-5 font-medium bg-gray-200 rounded-full cursor-pointer whitespace-nowrap hover:bg-gray-300"
            >
              {{ tag.tagName }}
            </div>
          </div>
          <div
            v-if="tagId"
            @click="setTagFilter('')"
            class="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
          >
            <i class="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div
          class="grid max-w-2xl grid-cols-1 mx-auto mt-16 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          <div v-for="(post, index) in posts" :key="index">
            <NuxtLink :to="`/blogs/${post.postId}`">
              <article class="flex flex-col items-start justify-between">
                <div class="relative w-full">
                  <img
                    :src="post.banner"
                    alt=""
                    class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                  />
                  <div
                    class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"
                  ></div>
                </div>
                <div class="max-w-xl">
                  <div class="flex items-center mt-8 text-xs gap-x-4">
                    <p class="text-gray-500">
                      {{ post.updatedAt }}
                    </p>
                    <p
                      class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {{ post.tagName }}
                    </p>
                  </div>
                  <div class="relative group">
                    <h3
                      class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
                    >
                      {{ post.title }}
                    </h3>
                    <p
                      class="mt-5 text-sm leading-6 text-gray-600 line-clamp-3"
                    >
                      {{ post.description }}
                    </p>
                  </div>
                </div>
              </article>
            </NuxtLink>
          </div>

          <!-- More posts... -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      tags: [],
      isLoading: false,
      tagId: this.$route.query.tagId || "",
    };
  },
  mounted() {
    this.getPosts();
    this.getTags();
  },
  methods: {
    async getPosts() {
      this.isLoading = true;

      await this.$api.get(`/platform/posts?tagId=${this.tagId}`).then((res) => {
        if (res.success) {
          this.posts = res.posts;
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
    setTagFilter(tagId) {
      this.$router.push({ query: { tagId } });

      this.tagId = tagId;

      this.getPosts();
    },
  },
};
</script>
