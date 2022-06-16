<template>
  <PreloaderComponent
      v-if="loading"
  ></PreloaderComponent>
  <div class="container m-2" v-else>
    <PostCard
        class="w-auto mb-3"
    >
      <h5 class="card-title">{{ post.title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ post.description }}</h6>
      <p class="card-text">{{ post.content }}</p>
      <h6 class="card-subtitle mb-2 text-muted">{{ post.user?.name }}</h6>
      <h6 class="card-subtitle mb-2 text-muted">{{ post.created_at }}</h6>
      <router-link
          class="btn btn-success me-2"
          :to="{ name: 'createComment', params: { postId: postId }}"
      >Create Comment
      </router-link>
      <router-link
          class="btn btn-warning me-2"
          :to="{ name: 'editPost', params: { postId: postId }}"
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
    </CommentCard>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import PostCard from '@/components/PostCard'
import CommentCard from '@/components/CommentCard'
import PreloaderComponent from '@/components/Preloader'

export default {
  name: 'PostPage',
  components: { PostCard, CommentCard, PreloaderComponent },
  setup() {
    const store = useStore()
    const route = useRoute()

    onMounted(() => {
      store.dispatch('getPost', route.params.postId)
    })

    function createComment(postId) {
      console.log(postId)
    }

    function delPost(postId) {
      store.dispatch('deletePost', postId)
    }

    return {
      postId: route.params.postId,
      post: computed(() => store.getters.getPost),
      loading: computed(() => store.getters.getLoading),
      createComment,
      delPost
    }
  }
}
</script>
