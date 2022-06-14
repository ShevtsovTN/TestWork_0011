<template>
  <PostCard>
    <h5 class="card-title">{{ post.title }}</h5>
    <h6 class="card-subtitle mb-2 text-muted">{{ post.description }}</h6>
    <p class="card-text">{{ post.content }}</p>
    <h6 class="card-subtitle mb-2 text-muted">{{ post.user.name }}</h6>
    <h6 class="card-subtitle mb-2 text-muted">{{ post.created_at }}</h6>
    <button
        type="button"
        class="btn btn-success me-2"
        @click="createComment(post.id)"
    >Create Comment</button>
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
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PostCard from '@/components/PostCard'

export default {
  name: 'PostPage',
  components: {
    PostCard
  },
  setup() {
    const store = useStore()
    const route = useRoute()

    onMounted(() => {
      store.dispatch('getPost', route.params.postId)
    });

    return {
      post: computed(() => store.getters.getPost),
      delPost: (postId) => store.dispatch('deletePost', postId)
    }
  }
}
</script>
