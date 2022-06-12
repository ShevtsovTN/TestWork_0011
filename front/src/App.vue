<template>
  <div class="app">
    <MenuComponent />
    <router-view></router-view>
  </div>
</template>

<script>

import MenuComponent from '@/components/Menu'
export default {
  name: 'App',
  components: {
    MenuComponent
  },
  data () {
    return {
      posts: []
    }
  },
  // mounted () {
  //   this.$store.dispatch('getPosts')
  //   this.$store.dispatch('getComments')
  // }
}
</script>
