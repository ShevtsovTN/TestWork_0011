<template>
  <div class="container m-2">
    <PostCard
        class="w-auto mb-3"
    >
      <h5 class="card-title">{{ post.title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ post.description }}</h6>
      <p class="card-text">{{ post.content }}</p>
      <h6 class="card-subtitle mb-2 text-muted">{{ post.user.name }}</h6>
      <h6 class="card-subtitle mb-2 text-muted">{{ post.created_at }}</h6>
      <button
          type="button"
          class="btn btn-success me-2"
          @click="createComment(post.id)"
      >Create Comment
      </button>
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
      >Delete Post
      </button>
    </PostCard>
    <CommentCard
        class="mt-2 w-25"
        v-for="comment in post.comments"
        :key="comment.id"
    >
      <h5 class="card-title">{{ comment.title }}</h5>
      <p class="card-text">{{ comment.content }}</p>
      <h6 class="card-subtitle mb-2 text-muted">{{ comment.user.name }}</h6>
      <h6 class="card-subtitle mb-2 text-muted">{{ comment.created_at }}</h6>
<!--      <router-link-->
<!--          type="button"-->
<!--          class="btn btn-warning me-2"-->
<!--          :to="{ name: 'editComment', params: { commentId: comment.id }}"-->
<!--      >Edit Post-->
<!--      </router-link>-->
<!--      <button-->
<!--          type="button"-->
<!--          class="btn btn-danger me-2"-->
<!--          @click="delComment(comment.id)"-->
<!--      >Delete Comment-->
<!--      </button>-->
    </CommentCard>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PostCard from '@/components/PostCard'
import CommentCard from '@/components/CommentCard'

export default {
  name: 'PostPage',
  components: {
    PostCard, CommentCard
  },
  setup() {
    const store = useStore()
    const route = useRoute()

    onMounted(() => {
      store.dispatch('getPost', route.params.postId)
    });

    function createComment(postId) {
      console.log(postId)
    }

    return {
      post: computed(() => store.getters.getPost),
      createComment,
      delPost: (postId) => store.dispatch('deletePost', postId)
    }
  }
}
</script>
