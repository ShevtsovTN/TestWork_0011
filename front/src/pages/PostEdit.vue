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
      @submit.prevent="submit(post.id)"
    >
      <div class="col-md-6">
        <label for="validationTitle" class="form-label">Title</label>
        <input
            type="text"
            class="form-control"
            id="validationTitle"
            :class="{'is-invalid': !form.title.valid && form.title.touched, 'is-valid': form.title.valid}"
            @blur="form.title.blur"
            v-model="form.title.value"
        >
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
      <div class="col-md-6">
        <label for="validationDescription" class="form-label">Description</label>
        <input
            type="text"
            class="form-control"
            id="validationDescription"
            :class="{'is-invalid': !form.description.valid && form.description.touched, 'is-valid': form.description.valid}"
            @blur="form.description.blur"
            v-model="form.description.value"
        >
        <small class="invalid-feedback" v-if="form.description.errors.minLength">
          The number of characters is less than the allowed number!
        </small>
        <small class="invalid-feedback" v-if="form.description.errors.maxLength">
          You have exceeded the allowed number of characters!
        </small>
        <small class="valid-feedback" v-if="form.description.valid">
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
        if (value.value !== '') {
          data[key] = value.value
        }
      }
      if (Object.keys(data).length !== 0) {
        store.dispatch('updatePost', { postId, data })
      }
    }


    return {
      post: computed(() => store.getters.getPost),
      form,
      submit
    }
  }
}
</script>
