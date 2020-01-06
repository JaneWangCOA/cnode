<template>
  <div id="app">
    <TheHeader></TheHeader>
    <div class="main">
      <router-view name="main"></router-view>
    </div>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader'
import PostList from './components/PostList'
export default {
  name: 'App',
  components:{
    TheHeader,
    PostList
  }
}
</script>

<style>

</style>
