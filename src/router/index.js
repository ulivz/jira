import Vue from 'vue'
import Router from 'vue-router'
import JIRAPage from '../view/pages/JIRAPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'jira',
      component: JIRAPage
    }
  ]
})
