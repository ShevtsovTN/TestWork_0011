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
  }
}
</script>
