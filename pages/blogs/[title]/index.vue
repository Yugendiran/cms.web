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
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3"
              alt=""
            />
            <div class="flex items-center justify-between">
              <div>
                <p class="text-base font-semibold leading-7 text-indigo-600">
                  20 Mar 2020
                </p>
                <h1
                  class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                >
                  JavaScript for Beginners
                </h1>
              </div>
              <div class="flex items-center gap-2">
                <i class="text-2xl fa-solid fa-heart"></i>
                50 Likes
              </div>
            </div>
            <p class="mt-6 text-xl leading-8">
              Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem.
              At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at
              vitae feugiat egestas ac. Diam nulla orci at in viverra
              scelerisque eget. Eleifend egestas fringilla sapien.
            </p>
          </div>
        </div>

        <div class="mt-10">
          <!-- Comments -->
          <h2 class="text-2xl font-semibold text-gray-900">Comments</h2>

          <div class="mt-6 space-y-6">
            <div class="flex items-center space-x-4">
              <div class="relative w-12 h-12">
                <img
                  src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  class="absolute inset-0 object-cover w-full h-full rounded-full bg-gray-50"
                />
                <div
                  class="absolute inset-0 rounded-full ring-1 ring-inset ring-gray-900/10"
                ></div>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold leading-6 text-gray-900">
                  Alex John
                </h3>
                <p class="text-sm leading-6 text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
                    id="comment"
                    rows="4"
                    class="block w-full mt-1 border rounded-md shadow-sm form-textarea"
                  ></textarea>
                </div>
                <div class="flex justify-end">
                  <button
                    type="submit"
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
            <div v-for="n in 5" :key="n" class="flex items-center space-x-4">
              <div class="relative w-20 h-20">
                <img
                  src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80"
                  alt=""
                  class="absolute inset-0 object-cover w-full h-full rounded-lg bg-gray-50"
                />
                <div
                  class="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10"
                ></div>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold leading-6 text-gray-900">
                  Boost your conversion rate
                </h3>
                <div class="flex justify-between text-xs">
                  <p>Read more</p>
                  <p>Mar 16, 2020</p>
                </div>
              </div>
            </div>
            <!-- More posts... -->
          </div>
        </div>

        <div class="mt-10">
          <h2 class="text-2xl font-semibold text-gray-900">Tags</h2>
          <div class="flex flex-wrap gap-3 mt-6">
            <div
              v-for="n in 10"
              :key="n"
              class="relative rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
            >
              Marketing
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
