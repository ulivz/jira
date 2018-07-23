<template>
  <div class="header fadeInDown">
    <div class="header-left">
      <div class="header-left-item menu">
        <Icon
          @click="setShowSideBar(true)"
          type="android-menu"></Icon>
      </div>
      <div class="header-left-item logo">
        <i class="icon iconfont icon-Jira"></i>
      </div>
      <a class="header-left-item version"
         target="_blank"
         href="https://github.corp.ebay.com/haolchen/bolt-jira-report/blob/master/CHANGELOG.md"
      >{{ 'v' + version }}
      </a>
    </div>

    <div class="header-right">
      <TeamSelect/>
      <Welcome/>
      <Logout/>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import TeamSelect from './TeamSelect.vue'
  import Welcome from './Welcome.vue'
  import Logout from './Logout.vue'

  export default {
    name: 'Header',

    components: { TeamSelect, Welcome, Logout },

    data() {
      return {
        version: process.env.APP_VERSION
      }
    },

    computed: mapState(['showSideBar']),

    methods: mapMutations(['setShowSideBar'])
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .header {
    @extend %responsive-wrapper;
    position: absolute;
    width: 100%;
    top: 0;
    height: $desktop-header-height;
    @include scope-breakpoint($mobile) {
      padding: 0 20px;
      height: $mobile-header-height;
    }
    display: flex;
    .header-left {
      flex: 1;
      display: flex;
      align-items: center;
      .header-left-item {
        margin-right: 5px;
        &.menu {
          .ivu-icon-android-menu {
            font-size: 30px;
            color: rgba(255, 255, 255, .5);
          }
          @include scope-breakpoint($desktop) {
            display: none;
          }
          @include scope-breakpoint($tablet) {
            display: none;
          }
        }
        &.logo {
          .icon-Jira {
            flex: 1;
            font-size: 50px;
            position: relative;
            top: -5px;
            @include scope-breakpoint($mobile) {
              font-size: 30px;
              top: -2px;
            }
            color: #fff;
            transition: all 0.5s;
            &:hover {
              background-image: linear-gradient(90deg,
                #1098AD 0%,
                #07B39B 60%,
                #6DBA82 100%
              );
              background-size: cover;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
        }
        &.version {
          position: relative;
          top: 10px;
          color: rgba(255, 255, 255, .5);
          @include scope-breakpoint($mobile) {
            top: 5px;
          }
        }
      }
    }
    .header-right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      & > .team-select {
        flex: 0 0 100px;
        margin-right: 10px;
        @include scope-breakpoint($mobile) {
          display: none;
        }
      }
      & > .welcome {
        flex: 0 0 100px;
        margin-right: 10px;
        @include scope-breakpoint($mobile) {
          margin-right: 0px;
          text-align: right;
        }
      }
      & > .logout {
        flex: 0 0 100px;
        @include scope-breakpoint($mobile) {
          display: none;
        }
      }
    }
  }
</style>
