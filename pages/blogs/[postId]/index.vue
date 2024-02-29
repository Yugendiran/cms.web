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
        <div class="bg-white">
          <div class="text-base leading-7 text-gray-700">
            <img
              class="object-cover mb-5 aspect-video rounded-xl bg-gray-50"
              :src="post.banner"
              alt=""
            />
            <div class="flex items-center justify-between">
              <div>
                <p class="text-base font-semibold leading-7 text-indigo-600">
                  {{ post.createdAt }}
                </p>
                <h1
                  class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                >
                  {{ post.title }}
                </h1>
              </div>
              <div class="flex items-center gap-2">
                <i
                  @click="likePost()"
                  v-if="post.isLiked"
                  class="text-2xl text-red-400 fa-solid fa-heart"
                ></i>
                <i
                  @click="likePost()"
                  v-else
                  class="text-2xl fa-regular fa-heart"
                ></i>
                {{ post.totalLikes }} Likes
              </div>
            </div>
            <p class="mt-6 text-xl leading-8">
              {{ post.description }}
            </p>
          </div>
        </div>

        <div class="mt-10">
          <!-- Comments -->
          <h2 class="text-2xl font-semibold text-gray-900">Comments</h2>

          <div class="mt-6 space-y-6">
            <div
              v-for="(comment, index) in comments"
              :key="index"
              class="flex items-center space-x-4"
            >
              <div class="flex-1">
                <h3 class="text-lg font-semibold leading-6 text-gray-900">
                  {{ comment.userName }}
                </h3>
                <p class="text-sm leading-6 text-gray-600">
                  {{ comment.text }}
                </p>
              </div>
            </div>

            <!-- More comments... -->
          </div>

          <div class="mt-10">
            <h2 class="text-2xl font-semibold text-gray-900">
              Leave a comment
            </h2>
            <div class="mt-6">
              <div class="grid grid-cols-1 gap-6">
                <div>
                  <label
                    for="comment"
                    class="block text-sm font-medium leading-5 text-gray-700"
                    >Comment</label
                  >
                  <textarea
                    v-model="comment"
                    id="comment"
                    rows="4"
                    class="block w-full mt-1 border rounded-md shadow-sm form-textarea"
                  ></textarea>
                </div>
                <div class="flex justify-end">
                  <button
                    @click="postComment()"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
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
                      <p>Mar 16, 2020</p>
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
      popularPosts: [],
      tags: [],
      post: {},
      comments: [],
      postId: this.$route.params.postId,
      comment: "",
      isLoading: false,
    };
  },
  mounted() {
    this.getPopularPosts();
    this.getTags();
    this.getPost();
    this.getComments();
  },
  methods: {
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
    async getPost() {
      this.isLoading = true;

      await this.$api
        .get(`/platform/posts/${this.$route.params.postId}`)
        .then((res) => {
          if (res.success) {
            this.post = res.post;
          }
        });

      this.isLoading = false;
    },
    async getComments() {
      this.isLoading = true;

      await this.$api
        .get("/platform/comments?postId=" + this.postId)
        .then((res) => {
          if (res.success) {
            this.comments = res.comments;
          }
        });

      this.isLoading = false;
    },
    async postComment() {
      this.isLoading = true;

      await this.$api
        .post("/platform/comments", {
          postId: this.postId,
          comment: this.comment,
        })
        .then((res) => {
          if (res.success) {
            this.comment = "";
            alert(
              "Comment posted successfully. Admin will review and approve it."
            );
          }
        });

      this.isLoading = false;
    },
    async likePost() {
      this.isLoading = true;

      await this.$api
        .post(`/platform/posts/${this.postId}/like`)
        .then((res) => {
          if (res.success) {
            this.getPost();
          } else {
            alert(res.message);
          }
        });

      this.isLoading = false;
    },
  },
};
</script>
