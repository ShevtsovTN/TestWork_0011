<template>
  <PreloaderComponent
      v-if="loading"
  ></PreloaderComponent>
  <div
      id="posts-container"
      class="container-fluid mt-2"
      v-else
  >
    <PostCard
        class="w-25 mb-2"
        v-for="post in posts"
        :key="post.id"
    >
      <router-link
          class="nav-link p-0"
          :to="{ name: 'post', params: { postId: post.id }}"
      >
        <h5 class="card-title">{{ post.title }}</h5>
      </router-link>
      <h6 class="card-subtitle mb-3 text-muted">{{ post.description }}</h6>
      <h6 class="card-subtitle mb-2 text-muted">{{ post.user.name }}</h6>
      <h6 class="card-subtitle mb-2 text-muted">{{ post.created_at }}</h6>
      <router-link
          v-if="isAdmin || isModerator"
          class="btn btn-warning me-2"
          :to="{ name: 'editPost', params: { postId: post.id }}"
      >Edit Post
      </router-link>
      <button
          v-if="isAdmin || isModerator"
          type="button"
          class="btn btn-danger me-2"
          @click="delPost(post.id)"
      >Delete Post</button>
    </PostCard>
    <button
        type="button"
        class="btn btn-outline-success me-2 mb-2"
        :disabled="checkNextPostPage"
        @click="loadMorePosts"
    >Load More</button>
  </div>
</template>

<script>
import PostCard from '@/components/PostCard'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import PreloaderComponent from '@/components/Preloader'

export default {
  name: 'PostsPage',
  components: {
    PreloaderComponent,
    PostCard
  },
  setup() {
    const store = useStore()
    let counterPage = ref(1)

    onMounted(() => {
      store.dispatch('getPosts', counterPage.value)
    });

    function loadMorePosts() {
      if (store.getters.checkNextPostPage) {
        store.dispatch('getPosts', ++counterPage.value)
      }
    }

    return {
      posts: computed(() => store.getters.getPosts),
      loading: computed(() => store.getters.getLoading),
      checkNextPostPage: computed(() => !store.getters.checkNextPostPage),
      delPost: (postId) => store.dispatch('deletePost', postId),
      loadMorePosts,
      isAdmin: computed(() => store.getters.isAdmin),
      isModerator: computed(() => store.getters.isModerator),
    }
  }
}
</script>
