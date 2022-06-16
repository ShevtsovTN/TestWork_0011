<template>
  <div class="container m-2">
    <CommentCard
        class="mb-2"
        v-for="comment in comments"
        :key="comment.id"
    >
      <h5 class="card-title">{{ comment.title }}</h5>
      <p class="card-text">{{ comment.content }}</p>
      <h6 class="card-subtitle mb-2 text-muted">{{ comment.user.name }}</h6>
      <h6 class="card-subtitle mb-2 text-muted">{{ comment.created_at }}</h6>
      <button
        type="button"
        class="btn btn-danger me-2"
        @click="delComment(comment.id)"
      >Delete Comment
      </button>
    </CommentCard>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import CommentCard from '@/components/CommentCard'

export default {
  name: 'CommentsPage',
  components: {
    CommentCard
  },
  setup() {
    const store = useStore()

    onMounted(() => {
      store.dispatch('getComments')
    });

    return {
      comments: computed(() => store.getters.getComments),
      delComment: (commentId) => store.dispatch('deleteComment', commentId)
    }
  }
}
</script>
