<template>
  <div class="page login-page">
    <GradientBackground/>
    <j-header v-show="loggedIn"></j-header>
    <div rel="scrollWrapper" class="content animated slideInUp" :class="{'logged': loggedIn}">
      <!--<div class="website-title">Great Wall JIRA</div>-->
      <!--<div class="content-line-wrapper"></div>-->
      <template v-if="!loggedIn">
        <div class="headline">
          <svg class="icon icon-jira" aria-hidden="true">
            <use xlink:href="#icon-Jira"></use>
          </svg>
        </div>
        <LoginForm></LoginForm>
      </template>

      <SprintTrendDiagram :placeholder="placeholder" :teams="teams" ref='trendDiagram'
                          v-if="loggedIn && networkAvailable"></SprintTrendDiagram>
      <j-footer></j-footer>
    </div>
    <Loading ref='loading' v-show="loginning"/>
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
  //  import BScroll from 'better-scroll'
  import NetworkUtil from '../../utils/NetworkUtil'

  export default {
    name: 'Login',
    components: {
      'j-header': Header,
      'j-footer': Footer,
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
        .then(() => {
          this.networkChange(1)
        })
        .catch(() => {
          this.$Message.error('Your current network has no permissions to access JIRA!')
          this.networkChange(-1)
        })
//      this.$nextTick(() => {
//        this.scroll = new BScroll(this.$refs.scrollWrapper, {})
//      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    transition: top 0.5s;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    &.logged {
      top: 80px;
    }

    /*.website-title {
      font-size: 60px;
      font-weight: 200;
      text-align: center;
      font-family: unset;
      color: white;
      text-transform: uppercase;
      letter-spacing: 10px;
      background-image: linear-gradient(90deg, #F79533 0%, #F37055 15%, #EF4E7B 30%, #A166AB 44%, #5073B8 58%, #1098AD 72%, #07B39B 86%, #6DBA82 100%);
      background-size: cover;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .content-line-wrapper {
      @include percentage-expand(10px);
      border: 1px solid rgba(255, 255, 255, .2);
      border-radius: 20px;
    }*/

  }

  .headline {
    max-height: 180px;
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
    }
  }

</style>
