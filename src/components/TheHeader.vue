<template>
  <div class="header">
    <div class="wrap">
    <img src="../assets/cnodejs_light.svg" alt="">
    <ul>
      <li><a href="#">首页</a></li>
      <li><a href="#">新手入门</a></li>
      <li><a href="#">API</a></li>
      <li><a href="#">关于</a></li>
      <li><a href="#">注册</a></li>
      <li><a href="#">登录</a></li>
    </ul>
    </div>
  </div>
</template>

<script>
export default {
  name:"TheHeader"
}
</script>

<style lang="scss" scoped>
.header{
  height: 50px;
  padding:0 50px;
  background-color: #444;
  margin-bottom: 15px;
}
.wrap{
  max-width: 1200px;
  margin: auto;
    display:flex;
}
img{
  width: 120px;
  margin-right: auto;
  margin-top: -5px;
}

li{
  display: inline-block;
  margin:auto 15px;
  font-size: 13px;
  line-height: 50px;
}
a{
  color: #ccc;
}
a:hover{
  color:#fff;
}

</style>