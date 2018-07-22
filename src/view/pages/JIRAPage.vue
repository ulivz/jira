<template>
  <div class="page login-page">
    <GradientBackground/>
    <JHeader v-show="loggedIn"/>
    <div
      rel="scrollWrapper"
      class="content animated slideInUp"
      :class="{
        'logged': loggedIn,
        'input-focused': inputFocused
      }"
    >
      <template v-if="!loggedIn">
        <div class="headline">
          <svg class="icon icon-jira" aria-hidden="true">
            <use xlink:href="#icon-Jira"></use>
          </svg>
        </div>
        <LoginForm/>
      </template>

      <SprintTrendDiagram
        ref='trendDiagram'
        v-if="loggedIn && networkAvailable"
        :teams="teams"
      />

      <JFooter v-show="loggedIn"/>
    </div>

    <Loading
      ref='loading'
      v-show="loginning"
    />
  </div>

</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import Header from '../components/Header.vue'
  import Footer from '../components/Footer.vue'
  import GradientBackground from '../components/GradientBackground'
  import LoginForm from '../components/LoginForm'
  import Loading from '../components/Loading'
  import SprintTrendDiagram from '../components/SprintTrendDiagram.vue'
  import NetworkUtil from '../../utils/NetworkUtil'

  export default {
    name: 'JIRAPage',

    components: {
      JHeader: Header,
      JFooter: Footer,
      GradientBackground,
      LoginForm,
      Loading,
      SprintTrendDiagram
    },
    methods: {
      ...mapMutations([
        'loginStart',
        'loginSuccess',
        'loginFail',
        'logout',
        'networkChange',
        'changeTeam'
      ])
    },

    computed: {
      ...mapState([
        'inputFocused',
        'blurInput',
        'loggedIn',
        'loginning',
        'networkAvailable',
        'teams',
        'currentTeamId',
        'auth'
      ])
    },

    mounted() {
      if (process.env.APP_MODE === 'feOnly') {
        return
      }
      return NetworkUtil.ping('https://jira.corp.ebay.com')
        .then(() => this.networkChange(1))
        .catch(() => {
          this.$Message.error('Your current network has no permissions to access JIRA!')
          this.networkChange(-1)
        })
    }
  }
</script>

<style lang="scss">
  #app {
    @extend %full-expand;
  }

  .login-page {
    @extend %full-expand;
    overflow: hidden;
  }

  .content {
    @extend %full-expand;
    background-color: white;
    text-align: center;
    top: 61.8%;
    @include scope-breakpoint($mobile) {
      top: 55%;
    }
    transition: top 0.5s;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    &.logged {
      top: 80px;
    }
    @include scope-breakpoint($mobile) {
      &.input-focused {
        top: 30%;
      }
    }
  }

  .headline {
    max-height: 160px;
    overflow: hidden;
    .logo-greatwall-wrapper {
      position: relative;
      vertical-align: middle;
      display: inline-block;
      width: 75px;
      height: 220px;
      overflow: hidden;
      .logo-greatwall {
        @extend %absolute-center-better;
        transform: scale(0.7);
      }
    }
    .icon-jira {
      vertical-align: middle;
      font-size: 220px;
      @include scope-breakpoint($mobile) {
        font-size: 180px;
      }
    }
  }
</style>
