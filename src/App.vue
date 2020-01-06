<template>
  <div id="app">
    <TheHeader></TheHeader>
    <div class="main">
      <router-view class="content" name="main"></router-view>
      <router-view class="slidebar" name="slidebar"></router-view>
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
  .main{
    max-width: 1200px;
    margin: auto;
    display:flex;
  }

  .content{
    flex:60%;
  }

  .slidebar{
    width: 300px;
    margin-left: 15px;
  }

  @media screen and (max-width: 900px) {
  .autherinfo {
    width:0;
  }
}
</style>
