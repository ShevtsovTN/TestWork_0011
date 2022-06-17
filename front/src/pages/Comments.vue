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
    <button
        type="button"
        class="btn btn-outline-success me-2 mb-2"
        :disabled="checkNextCommentPage"
        @click="loadMoreComments"
    >Load More</button>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import CommentCard from '@/components/CommentCard'

export default {
  name: 'CommentsPage',
  components: {
    CommentCard
  },
  setup() {
    const store = useStore()
    let counterPage = ref(1)

    onMounted(() => {
      store.dispatch('getComments', counterPage)
    });

    function loadMoreComments() {
      if (store.getters.checkNextCommentPage) {
        store.dispatch('getComments', ++counterPage.value)
      }
    }

    return {
      comments: computed(() => store.getters.getComments),
      checkNextCommentPage: computed(() => !store.getters.checkNextCommentPage),
      delComment: (commentId) => store.dispatch('deleteComment', commentId),
      loadMoreComments
    }
  }
}
</script>
