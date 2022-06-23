<template>
  <div class="container align-content-center justify-content-center m-2">
    <form
        class="row g-3 needs-validation"
        novalidate
        @submit.prevent="submit()"
    >
      <div class="col-md-6">
        <label for="validationTitle" class="form-label">Email</label>
        <input
            type="text"
            class="form-control"
            id="validationEmail"
            :class="{'is-invalid': !form.email.valid && form.email.touched, 'is-valid': form.email.valid}"
            @blur="form.email.blur"
            v-model="form.email.value"
        >
        <small class="text-muted">min 3 / {{form.email.value.length}} / max 100</small>
        <small class="invalid-feedback" v-if="form.email.errors.required">
          The field cannot be empty!
        </small>
        <small class="invalid-feedback" v-if="form.email.errors.minLength">
          The number of characters is less than the allowed number!
        </small>
        <small class="invalid-feedback" v-if="form.email.errors.maxLength">
          You have exceeded the allowed number of characters!
        </small>
        <small class="valid-feedback" v-if="form.email.valid">
          Looks good!
        </small>
      </div>
      <div class="col-md-6">
        <label for="validationDescription" class="form-label">Password</label>
        <input
            type="text"
            class="form-control"
            id="validationDescription"
            :class="{'is-invalid': !form.password.valid && form.password.touched, 'is-valid': form.password.valid}"
            @blur="form.password.blur"
            v-model="form.password.value"
        >
        <small class="text-muted">min 3 / {{form.password.value.length}} / max 10</small>
        <small class="invalid-feedback" v-if="form.password.errors.required">
          The field cannot be empty!
        </small>
        <small class="invalid-feedback" v-if="form.password.errors.minLength">
          The number of characters is less than the allowed number!
        </small>
        <small class="invalid-feedback" v-if="form.password.errors.maxLength">
          You have exceeded the allowed number of characters!
        </small>
        <small class="valid-feedback" v-if="form.password.valid">
          Looks good!
        </small>
      </div>
      <div class="col-12">
        <button
            class="btn btn-primary"
            type="submit"
            :disabled="!form.valid"
        >Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useForm } from '@/use/form'
import { maxLength, minLength, required } from '@/use/validation'
import { reactive } from 'vue'

export default {
  name: 'LoginPage',
  setup() {
    const store = useStore()
    const router = useRouter()

    const form = useForm({
      email: {
        value: '',
        validators: {required, minLength: minLength(3), maxLength: maxLength(100)}
      },
      password: {
        value: '',
        validators: {required, minLength: minLength(3), maxLength: maxLength(10)}
      }
    })

    function submit() {
      const data = reactive({})
      for (const [key, value] of Object.entries(form)) {
        data[key] = value.value
      }
      store.dispatch('login', data)
      router.push('posts')
    }


    return {
      form,
      submit
    }
  }
}
</script>
