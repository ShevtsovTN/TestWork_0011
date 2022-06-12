<template>
  <div class="container-fluid m-2">
    <PostCard
        v-for="post in posts"
        :key="post.id"
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
      >Create Comment</button>
      <button
          type="button"
          class="btn btn-warning me-2"
          @click="editPost(post.id)"
      >Edit Post</button>
      <button
          type="button"
          class="btn btn-danger me-2"
          @click="delPost(post.id)"
      >Delete Post</button>
    </PostCard>
    <ModalForm v-if="isClicked">
      <template v-slot:header>
        <h5 class="modal-title" v-if="isEdit">Edit Post</h5>
        <h5 class="modal-title" v-if="isCreate">Create Comment</h5>
      </template>
      <template v-slot:form>
        <!-- content for the header slot -->
      </template>
      <template v-slot:button>
        <button
          type="button"
          class="btn btn-secondary"
          v-if="isEdit"
        >Save
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          v-if="isCreate"
        >Create
        </button>
      </template>
    </ModalForm>
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

<style scoped>

</style>
