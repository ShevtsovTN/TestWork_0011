<template>
  <div class="container  m-2">
    <PostCard class="mb-2">
      <h5 class="card-title mb-2">{{ post.title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ post.description }}</h6>
      <p class="card-text mb-2 text-muted">{{ post.content }}</p>
      <h6 class="card-subtitle mb-2 text-muted">{{ post.user?.name }}</h6>
      <h6 class="card-subtitle mb-2 text-muted">{{ post.created_at }}</h6>
    </PostCard>
    <form
      class="row g-3 needs-validation"
      @submit.prevent="submit(post.id)"
    >
      <div class="col-md-6">
        <label for="validationTitle" class="form-label">Title</label>
        <input
            type="text"
            class="form-control"
            id="validationTitle"
            v-model="form.title.value"
        >
        <div class="invalid-feedback" v-if="form.title.errors.minLength">
          The number of characters is less than the allowed number!
        </div>
        <div class="invalid-feedback" v-if="form.title.errors.maxLength">
          You have exceeded the allowed number of characters!
        </div>
      </div>
      <div class="col-md-6">
        <label for="validationDescription" class="form-label">Description</label>
        <input
            type="text"
            class="form-control"
            id="validationDescription"
            v-model="form.description.value"
        >
        <div class="invalid-feedback" v-if="form.description.errors.minLength">
          The number of characters is less than the allowed number!
        </div>
        <div class="invalid-feedback" v-if="form.description.errors.maxLength">
          You have exceeded the allowed number of characters!
        </div>
      </div>
      <div class="col-md-12">
        <label for="validationContent" class="form-label">Content</label>
        <textarea
            class="form-control"
            id="validationContent"
            v-model="form.content.value"
        ></textarea>
        <div class="invalid-feedback" v-if="form.content.errors.minLength">
          The number of characters is less than the allowed number!
        </div>
        <div class="invalid-feedback" v-if="form.content.errors.maxLength">
          You have exceeded the allowed number of characters!
        </div>
      </div>
      <div class="col-12">
        <button
            class="btn btn-primary"
            type="submit"
        >Edit Post</button>
      </div>
    </form>
  </div>
</template>

<script>

import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import PostCard from '@/components/PostCard'
import { useForm } from '@/use/form'
import { reactive } from 'vue'

const minLength = num => val => val.length >= num
const maxLength = num => val => val.length <= num

export default {
  name: 'PostEdit',
  components: { PostCard },
  setup() {
    const store = useStore()
    const route = useRoute()

    onMounted(() => {
      store.dispatch('getPost', route.params.postId)
    })

    const form = useForm({
      title: {
        value: '',
        validators: {minLength: minLength(10), maxLength: maxLength(50)}
      },
      description: {
        value: '',
        validators: {minLength: minLength(10), maxLength: maxLength(255)}
      },
      content: {
        value: '',
        validators: {minLength: minLength(50), maxLength: maxLength(1500)}
      }
    })

    function submit(postId) {
      const data = reactive({})
      for (const [key, value] of Object.entries(form)) {
        if (value.value !== '' && key !== 'valid')
        data[key] = value.value
      }
      store.dispatch('updatePost', { postId, data })
    }


    return {
      post: computed(() => store.getters.getPost),
      form,
      submit,
    }
  }
}
</script>
