<template>
  <div class="container-fluid m-2">
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
          type="button"
          class="btn btn-warning me-2"
          :to="{ name: 'editPost', params: { postId: post.id }}"
      >Edit Post
      </router-link>
      <button
          type="button"
          class="btn btn-danger me-2"
          @click="delPost(post.id)"
      >Delete Post</button>
    </PostCard>
  </div>
</template>

<script>
import PostCard from '@/components/PostCard'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'PostsPage',
  components: {
    PostCard
  },
  setup() {
    const store = useStore()

    onMounted(() => {
      store.dispatch('getPosts')
    });

    return {
      posts: computed(() => store.getters.getPosts),
      delPost: (postId) => store.dispatch('deletePost', postId)
    }
  }
}
</script>
