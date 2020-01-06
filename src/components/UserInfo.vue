<template>
  <div class="user-info">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" alt />
    </div>
    <div v-else>
      <div class="home container">
        <div class="title">主页</div>
        <div class="content">
          <div class="user">
            <img class="avatar-img" :src="post.avatar_url">
            <span class="login-name">{{post.loginname}}</span>
          </div>
          <p class="score">{{post.score}}积分</p>
          <p class="signup-time">
            注册时间{{post.create_at|formatDate}}
          </p>
        </div>
      </div>
      <div class="created container">
        <div class="title">最近创建的话题</div>
        <ul>
          <li v-for="(post,index) in post.recent_topics" :key="index" class="item">
          <router-link class="post-title" :to="{name:'post_content',params:{id:post.id,name:post.author.loginname}}">
            <span class="topic-title">{{post.title}}</span>
          </router-link>
          <span class="last-reply">{{post.last_reply_at | formatDate}}</span>
        </li>
        <li class="more">查看更多»</li>
        </ul>
      </div>
      <div class="attended container">
        <div class="title">最近参与的话题</div>
        <ul v-if="post.recent_replies.length !== 0">
          <li v-for="(post,index) in post.recent_replies" :key="index" class="item">
          <router-link class="post-title" :to="{name:'post_content',params:{id:post.id,name:post.author.loginname}}">
            <span class="topic-title">{{post.title}}</span>
          </router-link>
          <span class="last-reply">{{post.last_reply_at | formatDate}}</span>
        </li>
        <li class="more">查看更多»</li>
        </ul>
        <ul v-else>
          <li class="none">无话题</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"UserInfo",
  data(){
    return{
      isLoading: false,
      post:{}
    }
  },
  beforeMount(){
    this.isLoading = true
    this.getUserData()
  },
  methods:{
    async getUserData(){
      try{
        const dataBody = await this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        this.isLoading = false
        this.post = dataBody.data.data
        console.log(this.post)
      }catch(error){
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  max-width: 1200px;
  margin: auto;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 15px;
}
.last-reply{
  float: right;
}
.topic-title{
  font-size: 16px;
  line-height: 30px;
  color: #08c;

}
.topic-title:hover{
  text-decoration: underline;
  color: #005580;
}
.last-reply {
  color: #778087;
  font-size: 11px;
  margin-left: auto;
}

.title{
  height: 40px;
  padding: 10px;
  background-color: #f6f6f6;
  line-height: 20px;
  font-size: 14px;
  color: #444;
  border-bottom: 1px solid #f0f0f0;
}

.home .title{
  color: #80bd01;
}

.created .title{
  border: none;
}

.more{
  color: #666;
  font-size: 14px;
}


.avatar-img{
  height: 40px;
  width: 40px;
  background-color: pink;
  
}

.content{
  padding: 10px;
}

.login-name{
  color: #778087;
  margin-left: 5px;
  font-size: 14px;
}

.user{
  display: flex;
  align-items: flex-start;
}

.score{
  color:#333;
  font-size: 14px;
  line-height: 40px;
}

.signup-time{
  color: #ababab;
  font-size: 14px;
  height: 28px;
  line-height: 28px;
  margin-bottom: 5px;
}

ul>li{
  padding-top: 10px;
  padding-bottom: 10px;
  border-top:1px solid #f0f0f0;
}

ul{
  padding-left: 10px;
  padding-right: 10px;
}

.none{
  font-size: 14px;
  color: #333;
}
</style>