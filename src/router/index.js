import Vue from 'vue'
import Router from 'vue-router'
import TheArticle from '../components/TheArticle'
import PostList from '../components/PostList'
import UserInfo from '../components/UserInfo'
import SlideBar from '../components/SlideBar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name:'root',
      path:'/',
      components:{
        main:PostList,
      }
    },
    {
      name:'post_content',
      path:'/topic/:id&author=:name',
      components:{
        main:TheArticle,
        slidebar:SlideBar
      }
    },
    {
      name:'user_info',
      path:'/userinfo/:name',
      components:{
        main:UserInfo
      }
    }
  ]
})
