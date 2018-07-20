import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../view/pages/Layout.vue'
import JIRAPage from '../view/pages/JIRAPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Layout
    },
    {
      path: '/',
      name: 'jira',
      component: JIRAPage
    }
  ]
})
