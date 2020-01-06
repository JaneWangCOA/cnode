<template>
  <div class="autherinfo">
    <div class="authersummay">
      <div class="topbar">作者</div>
      <router-link
        :to="{
          name:'user_info',
          params:{
            name:userinfo.loginname
          }
          }"
      >
        <img :src="userinfo.avatar_url" alt />
        <p class="score">积分{{userinfo.score}}</p>
        <p class="description"></p>
      </router-link>
    </div>
    <div class="recent_topics">
      <div class="topbar">作者最近主题</div>
      <ul>
        <li v-for="(list,index) in topcilimitby5" :key="index">
          <router-link
            :to="{
              name:'post_content',
              params:{
                id:list.id,
                name:list.author.loginname
              }
            }"
          >{{list.title}}</router-link>
        </li>
      </ul>
    </div>
    <div class="recent_replies">
      <div class="topbar">作者最近回复</div>
      <ul>
        <li v-for="(list,index) in replylimitby5" :key="index">
          <router-link
            :to="{
        name:'post_content',
        params:{
          id:list.id,
          name:list.author.loginname
        }
        }"
          >{{list.title}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SlideBar",
  data() {
    return {
      isLoading: false,
      userinfo: {}
    };
  },
  beforeMount() {
    this.isLoading = true; //加载成功之前显示加载动画
    this.getData(); //在页面加载之前获取数据
  },
  methods: {
    async getData() {
      try {
        const dataBody = await this.$http.get(
          `https://cnodejs.org/api/v1/user/${this.$route.params.name}`
        );
        this.isLoading = false; //加载成功，去除动画
        this.userinfo = dataBody.data.data;
        console.log(this.userinfo)
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    topcilimitby5() {
      if (this.userinfo.recent_topics) {
        return this.userinfo.recent_topics.slice(0, 5);
      }
    },
    replylimitby5() {
      if (this.userinfo.recent_replies) {
        return this.userinfo.recent_replies.slice(0, 5);
      }
    }
  }
};
</script>

<style scoped>
.authersummay,
.recent_replies,
.recent_topics {
  background-color: #fff;
}
.autherinfo {
  float: right;
  margin-top: 0;
}
li {
  padding: 3px 0;
  white-space: nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  padding-right: 10px;
}
.recent_replies ul,
.recent_topics ul {
  margin-top: 0px;
  margin-bottom: 0px;
  list-style: none;
  padding-left: 14px;
}

ul a {
  font-size: 12px;
  text-decoration: none;
  color: #778087;
}

.topbar {
  padding: 10px;
  background-color: #f6f6f6;
  font-size: 12px;
  margin-top: 10px;
}

img {
  height: 48px;
  width: 48px;
  border-radius: 3px;
  margin: 10px;
  background-color: pink;
}

.loginname {
  width: 100px;
  float: right;
  margin-top: 22px;
  margin-right: 159px;
  font-size: 14px;
}

.loginname a {
  text-decoration: none;
  color: #778087;
}

.authersummay .topbar {
  margin-top: 0px;
}

.score{
  font-size: 14px;
  color:#333;
  padding:5px 5px 5px 10px;
}


</style>
