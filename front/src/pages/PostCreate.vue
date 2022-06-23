<template>
  <div class="container  m-2">
    <form
        class="row g-3 needs-validation"
        novalidate
        @submit.prevent="submit()"
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
        <small class="text-muted">min 10 / {{form.description.value.length}} / max 255</small>
        <small class="invalid-feedback" v-if="form.description.errors.required">
          The field cannot be empty!
        </small>
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
        <small class="text-muted">min 50 / {{form.content.value.length}} / max 1500</small>
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
        >Create Post</button>
      </div>
    </form>
  </div>
</template>

<script>

import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useForm } from '@/use/form'
import { reactive } from 'vue'
import { minLength, maxLength, required } from '@/use/validation'

export default {
  name: 'PostCreate',
  setup() {
    const store = useStore()
    const router = useRouter()

    const form = useForm({
      title: {
        value: '',
        validators: {required, minLength: minLength(10), maxLength: maxLength(50)}
      },
      description: {
        value: '',
        validators: {required, minLength: minLength(10), maxLength: maxLength(255)}
      },
      content: {
        value: '',
        validators: {required, minLength: minLength(50), maxLength: maxLength(1500)}
      }
    })

    function submit() {
      const data = reactive({})
      for (const [key, value] of Object.entries(form)) {
        data[key] = value.value
      }
      store.dispatch('createPost', { data })
      router.push({name: 'posts'})
    }


    return {
      form,
      submit
    }
  }
}
</script>
