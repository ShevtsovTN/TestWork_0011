<template>
  <nav class="navbar m-2">
    <div  class="nav col-10">
      <div class="nav-item">
        <router-link :to="{ name: 'main'}" class="nav-link">Main</router-link>
      </div>
      <div class="nav-item">
        <router-link :to="{ name: 'posts'}" class="nav-link">Posts</router-link>
      </div>
      <div class="nav-item">
        <router-link
            v-show="isWriter"
            :to="{ name: 'createPost'}"
            class="nav-link"
        >Create Post</router-link>
      </div>
      <div class="nav-item">
        <router-link
            v-show="isAdmin || isModerator"
            :to="{ name: 'comments'}"
            class="nav-link"
        >Comments</router-link>
      </div>
      <div class="nav-item">
        <router-link
            v-show="!isAuth"
            :to="{ name: 'login'}"
            class="nav-link"
        >Login</router-link>
      </div>
    </div >
    <div
        v-show="isAuth"
        class="nav align-content-center justify-content-between col-2"
    >
      <span class="d-flex align-items-center">{{user.name}}</span>
      <button
          type="button"
          class="btn btn-outline-dark"
          @click="logout"
      >Logout</button>
    </div>
  </nav>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'MenuComponent',
  setup () {
    const store = useStore()

    function logout () {
      store.dispatch('logout')
    }
    return {
      user: computed(() => store.getters.getUser),
      isAuth: computed(() => store.getters.isAuth),
      isAdmin: computed(() => store.getters.isAdmin),
      isModerator: computed(() => store.getters.isModerator),
      isWriter: computed(() => store.getters.isWriter),
      isReader: computed(() => store.getters.isReader),
      logout
    }
  }
}
</script>
