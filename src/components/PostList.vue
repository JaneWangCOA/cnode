<template>
  <div class="post">
    <div class="loading" v-show="isLoading">
      <img src="../assets/loading.gif" alt />
    </div>
    <div class="post-list">
      <ul class="nav-bar" @click="changeType" ref="bar">
        <li>
          <a class="active">全部</a>
        </li>
        <li>
          <a>精华</a>
        </li>
        <li>
          <a>分享</a>
        </li>
        <li>
          <a>问答</a>
        </li>
        <li>
          <a>招聘</a>
        </li>
        <li>
          <a>客户端测试</a>
        </li>
      </ul>
      <ul class="post-content" v-show="!isLoading">
        <li v-for="(post,index) in posts" :key="index" class="post-item">
          <router-link
            :to="{
          name:'user_info',
          params:{
            name:post.author.loginname
          }
          }"
          >
            <img :src="post.author.avatar_url" alt />
          </router-link>
          <div class="post-count">
            <span class="reply-count">{{post.reply_count}}</span>
            <span class="slash">/</span>
            <span>{{post.visit_count}}</span>
          </div>
          <span
            :class="[{put_good:(post.good === true)},{put_top:(post.top === true)},{topiclist_tab:(post.top !== true && post.good !== true)}]"
          >{{post |tabFormatter}}</span>
          <router-link
            class="post-title"
            :to="{name:'post_content',params:{id:post.id,name:post.author.loginname}}"
          >
            <span>{{post.title}}</span>
          </router-link>
          <span class="last-reply">{{post.last_reply_at | formatDate}}</span>
        </li>
      </ul>
    </div>
    <ThePage @handleList="renderList" :page="postpage"></ThePage>
  </div>
</template>

<script>
import ThePage from "./ThePage";
export default {
  name: "PostList",
  data() {
    return {
      isLoading: false,
      posts: [],
      postpage: 1,
      type: "全部",
      typelist: {
        全部: [, ""],
        精华: [true, "good"],
        置顶: [true, "top"],
        问答: [true, "ask"],
        分享: [true, "share"],
        招聘: [true, "job"]
      },
      checker: ""
    };
  },
  beforeMount() {
    this.isLoading = true;
    this.getData();
  },
  mounted() {
    const ul = this.$refs.post;
    console.log(ul);
  },
  methods: {
    async getData() {
      try {
        this.isLoading = true;
        const dataBody = await this.$http.get(
          "https://cnodejs.org/api/v1/topics",
          {
            params: {
              page: this.postpage,
              limit: 20,
              tab: this.checker
            }
          }
        );
        this.posts = dataBody.data.data;
        this.isLoading = false;
        const time = new Date(this.posts[0].last_reply_at);
        const currentTime = new Date();
        const timeDiff = currentTime - time;
      } catch (error) {
        console.log(error);
      }
    },
    changeType(event) {
      this.type = event.target.innerText;
      this.checker = this.typelist[this.type][1];
      const bar = this.$refs.bar.children
      for(let i = 0; i < 6;i++){
        bar[i].children[0].className = ""
      }
      event.target.className = "active"
      this.postpage = 1
      this.getData();
    },
    renderList(value) {
      this.postpage = value;
      this.getData();
    }
  },
  components: {
    ThePage
  }
};
</script>

<style lang="scss" scoped>
.post {
  border-radius: 5px;
  background-color: #fff;
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
  margin-bottom: 150px;
}
img {
  height: 30px;
  width: 30px;
  display: block;
  background-color: pink;
}

.nav-bar {
  height: 40px;
  padding: 10px;
  background-color: #f6f6f6;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  li {
    margin: 0 10px;
    font-size: 14px;
    a {
      color: #80bd01;
    }
    a:hover {
      color: #08c;
    }
  }
  .active {
    background-color: #80bd01;
    color: #fff;
    padding: 3px 4px;
    border-radius: 3px;
  }
  .active:hover {
    color: #fff;
  }
}

.post-item {
  padding: 10px;
  display: flex;
  align-items: center;
  border-top: 1px solid #f0f0f0;
}

.post-count {
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    display: block;
    font-size: 10px;
    color: #b4b4b4;
  }
  .reply-count {
    color: #9e78c0;
    font-size: 14px;
  }
  .slash {
    color: #333;
  }
}

.post-title {
  color: #888;
  font-size: 16px;
  white-space: nowrap;
  max-width: 70%;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-left: 5px;
}

.last-reply {
  color: #778087;
  font-size: 11px;
  margin-left: auto;
}

.put_good,
.put_top {
  background: #80bd01;
  padding: 2px 4px;
  border-radius: 3px;
  border-radius: 3px;
  color: #fff;
  font-size: 12px;
  margin-right: 10px;
}

.topiclist_tab {
  background-color: #e5e5e5;
  color: #999;
  padding: 2px 4px;
  border-radius: 3px;
  border-radius: 3px;
  font-size: 12px;
  margin-right: 10px;
}
</style>