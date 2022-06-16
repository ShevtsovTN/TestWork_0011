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
        novalidate
        @submit.prevent="submit()"
    >
      <div class="col-md-12">
        <label for="validationTitle" class="form-label">Title</label>
        <input
            type="text"
            class="form-control"
            id="validationTitle"
            :class="{'is-invalid': !form.title.valid && form.title.touched, 'is-valid': form.title.valid}"
            @blur="form.title.blur"
            v-model="form.title.value"
        >
        <small class="text-muted">min 10 / {{form.title.value.length}} / max 50</small>
        <small class="invalid-feedback" v-if="form.title.errors.required">
          The field cannot be empty!
        </small>
        <small class="invalid-feedback" v-if="form.title.errors.minLength">
          The number of characters is less than the allowed number!
        </small>
        <small class="invalid-feedback" v-if="form.title.errors.maxLength">
          You have exceeded the allowed number of characters!
        </small>
        <small class="valid-feedback" v-if="form.title.valid">
          Looks good!
        </small>
      </div>
      <div class="col-md-12">
        <label for="validationContent" class="form-label">Content</label>
        <textarea
            class="form-control"
            id="validationContent"
            :class="{'is-invalid': !form.content.valid && form.content.touched, 'is-valid': form.content.valid}"
            @blur="form.content.blur"
            v-model="form.content.value"
        ></textarea>
        <small class="text-muted">min 10 / {{form.content.value.length}} / max 300</small>
        <small class="invalid-feedback" v-if="form.content.errors.required">
          The field cannot be empty!
        </small>
        <small class="invalid-feedback" v-if="form.content.errors.minLength">
          The number of characters is less than the allowed number!
        </small>
        <small class="invalid-feedback" v-if="form.content.errors.maxLength">
          You have exceeded the allowed number of characters!
        </small>
        <small class="valid-feedback" v-if="form.content.valid">
          Looks good!
        </small>
      </div>
      <div class="col-12">
        <button
            class="btn btn-primary"
            type="submit"
            :disabled="!form.valid"
        >Create Comment</button>
      </div>
    </form>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useForm } from '@/use/form'
import { maxLength, minLength, required } from '@/use/validation'
import { computed, onMounted, reactive } from 'vue'
import PostCard from '@/components/PostCard'

export default {
  name: 'CommentCreate',
  components: { PostCard },
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    onMounted(() => {
      store.dispatch('getPost', route.params.postId)
    })

    const form = useForm({
      title: {
        value: '',
        validators: { required, minLength: minLength(10), maxLength: maxLength(50) }
      },
      content: {
        value: '',
        validators: { required, minLength: minLength(10), maxLength: maxLength(300) }
      }
    })

    function submit () {
      const data = reactive({})
      for (const [key, value] of Object.entries(form)) {
        data[key] = value.value
      }
      store.dispatch('createComment', { postId: route.params.postId, data })
      router.push({ name: 'post', params: { postId: route.params.postId } })
    }

    return {
      postId: route.params.postId,
      post: computed(() => store.getters.getPost),
      form,
      submit
    }
  }
}
</script>
