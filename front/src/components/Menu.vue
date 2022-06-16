<template>
  <ul  class="nav m-2">
    <li class="nav-item">
      <router-link :to="{ name: 'main'}" class="nav-link">Main</router-link>
    </li>
    <li class="nav-item">
      <router-link :to="{ name: 'posts'}" class="nav-link">Posts</router-link>
    </li>
    <li class="nav-item">
      <router-link :to="{ name: 'createPost'}" class="nav-link">Create Post</router-link>
    </li>
    <li class="nav-item">
      <router-link :to="{ name: 'comments'}" class="nav-link">Comments</router-link>
    </li>
  </ul >
</template>

<script>
export default {
  name: 'MenuComponent'
}
</script>

<style scoped>

</style>
